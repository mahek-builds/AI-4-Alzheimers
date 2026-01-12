# Firebase Integration Guide 🔥

यह guide आपको बताएगी कि कैसे आप इस app को Firebase के साथ integrate कर सकते हैं।

---

## 📋 Prerequisites

1. [Firebase Console](https://console.firebase.google.com/) पर account बनाएं
2. नया Firebase project create करें
3. Web app add करें और config copy करें

---

## 🚀 Step 1: Firebase Setup

### 1.1 Firebase Config File बनाएं

`src/lib/firebase.ts` file create करें:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> ⚠️ **Note**: Firebase config keys publishable हैं, इन्हें code में रखना safe है।

---

## 🔐 Step 2: Authentication Migration

### 2.1 AuthContext.tsx Update करें

Replace `src/contexts/AuthContext.tsx`:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2.2 Login/Signup Pages Update

Login और Signup pages में functions को `async` बनाएं:

```typescript
// Before
const success = login(email, password);

// After
const success = await login(email, password);
```

---

## 📊 Step 3: Reports को Firestore में Save करें

### 3.1 reportService.ts Update करें

Replace `src/lib/reportService.ts`:

```typescript
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import jsPDF from 'jspdf';

export interface Report {
  id: string;
  userId: string;
  fileName: string;
  prediction: string;
  confidence?: number;
  details?: string;
  createdAt: Date;
  imagePreview?: string;
}

const REPORTS_COLLECTION = 'reports';

// Save report to Firestore
export const saveReport = async (
  report: Omit<Report, 'id' | 'createdAt'>
): Promise<Report> => {
  const docRef = await addDoc(collection(db, REPORTS_COLLECTION), {
    ...report,
    createdAt: Timestamp.now(),
  });
  
  return {
    ...report,
    id: docRef.id,
    createdAt: new Date(),
  };
};

// Get all reports for a user
export const getReportsByUser = async (userId: string): Promise<Report[]> => {
  const q = query(
    collection(db, REPORTS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  })) as Report[];
};

// Delete a report
export const deleteReport = async (reportId: string): Promise<void> => {
  await deleteDoc(doc(db, REPORTS_COLLECTION, reportId));
};

// generatePDF function remains the same
export const generatePDF = (report: Report): void => {
  // ... existing PDF generation code ...
};
```

### 3.2 Firestore Rules Setup

Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reports collection
    match /reports/{reportId} {
      // Users can only read/write their own reports
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      
      // Allow create if authenticated
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## 📁 Step 4: File Structure After Migration

```
src/
├── lib/
│   ├── firebase.ts          # Firebase config
│   ├── reportService.ts     # Firestore operations
│   └── utils.ts
├── contexts/
│   └── AuthContext.tsx      # Firebase Auth
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Prediction.tsx
│   └── Dashboard.tsx
```

---

## ✅ Migration Checklist

- [ ] Firebase project create करें
- [ ] Firebase config add करें (`src/lib/firebase.ts`)
- [ ] `AuthContext.tsx` update करें
- [ ] `reportService.ts` update करें
- [ ] Login/Signup pages में async/await add करें
- [ ] Prediction page में async saveReport call करें
- [ ] Firestore security rules set करें
- [ ] Firebase Authentication में Email/Password enable करें
- [ ] Test करें!

---

## 🔧 Common Issues & Solutions

### Issue 1: "Firebase App not initialized"
**Solution**: Ensure `firebase.ts` is imported before using auth/db

### Issue 2: "Permission denied" in Firestore
**Solution**: Check Firestore rules और ensure user is authenticated

### Issue 3: "Auth state not persisting"
**Solution**: Firebase automatically handles persistence, remove localStorage code

---

## 📞 Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth/web/start)
- [Firestore Guide](https://firebase.google.com/docs/firestore/quickstart)

---

> 💡 **Pro Tip**: Firebase का free tier काफी generous है - 1GB storage, 50K reads/day, 20K writes/day!
