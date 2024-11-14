import { defineStore } from "pinia"
import { ref, computed } from "vue"
import router from "@/router"
import { auth } from "@/utils/firebase"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  User,
} from "firebase/auth"
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth"
import { alertController } from "@ionic/vue"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null)
  const isAuth = computed(() => user.value !== null)
  const loginWithGoogle = async () => {
    try {
      await GoogleAuth.initialize({
        clientId: "672708876525-hvjc1tl56mtmonk7ekpvt4g4i18ud19o.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        grantOfflineAccess: true,
      })
      const googleUser = await GoogleAuth.signIn()
      const idToken = googleUser.authentication.idToken
      const credential = GoogleAuthProvider.credential(idToken)
      const result = await signInWithCredential(auth, credential)
      user.value = result.user
      router.push("/home")
    } catch (error) {
      console.error("Google sign-in error:", error)
      const alert = await alertController.create({
        header: "Login Gagal!",
        message: "Terjadi kesalahan saat login dengan Google. Coba lagi.",
        buttons: ["OK"],
      })
      await alert.present()
      throw error
    }
  }
  const logout = async () => {
    try {
      await signOut(auth)
      await GoogleAuth.signOut()
      user.value = null
      router.replace("/login")
    } catch (error) {
      console.error("Sign-out error:", error)
      throw error
    }
  }
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
  return { user, isAuth, loginWithGoogle, logout }
})
