export type FirebaseUser = {
  displayName?: string;
  email?: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber?: string;
  photoURL?: string;
  refreshToken: string;
  uid: string;
};

export type User = FirebaseUser;
