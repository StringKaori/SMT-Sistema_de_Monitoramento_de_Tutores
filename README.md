### README Exclusivo para esta branch
lembrar de atualizar o application do AndroidManifest em `android/app/src/main/AndroidManifest.xml` para adicionar o `android:usesCleartextTraffic="true"` para que seja possível fazer requisições HTTP

<application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round" android:allowBackup="true" android:theme="@style/AppTheme" android:supportsRtl="true" android:usesCleartextTraffic="true">