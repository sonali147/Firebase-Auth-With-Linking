# Firebase-Auth-With-Linking

Firebase allows to merge linked accounts but for that we need to store user email and oauthToken in Local storage.
If that seems insecure, then you need allow "Create multiple accounts for each identity provider" in Authentication settings.

If you have chosen "Link accounts that use the same email" Authentication setting, then know this
Firebase with automatically link account from untrusted to trusted IDP (Identity Provider).
For instance, if you have logged in via Github IDP (untrusted) and later try loggin in via Google IPD (trusted).
No issues. Account will happen automatically and your provider will be Google in Firebase user details.
On the other hand, if you try to login in the reverse sequence -> Google first and then Github,
Github login will give you error.

This repository is going to help you navigate through this scenario.
