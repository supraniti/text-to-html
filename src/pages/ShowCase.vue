<template>
  <q-page class="row items-start">
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'

export default defineComponent({
  name: 'ShowCase',
  setup () {
    const firebaseConfig = {
      apiKey: "AIzaSyCZ1wHo6TjxbS7w7TPcXfaWkEl2vlu1UtY",
      authDomain: "test-to-html.firebaseapp.com",
      projectId: "test-to-html",
      storageBucket: "test-to-html.appspot.com",
      messagingSenderId: "597064127226",
      appId: "1:597064127226:web:1cb77c45659cd7fc54ef43",
      measurementId: "G-2NPWK5B5YQ"
    }
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    console.log(app, auth, provider)

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log('result', result)
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(error)
      })
  }
})
</script>
