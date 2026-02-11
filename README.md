# 🔱 Aurenis Customer — Déploiement

## ⚡ Option 1 : Vercel (recommandé — 2 min)

### Étape 1 : Upload sur GitHub
1. Va sur **github.com** → clique **"New repository"**
2. Nom : `aurenis-customer` → **Create**
3. Clique **"uploading an existing file"**
4. Dézippe le dossier `aurenis-deploy` sur ton PC
5. Drag & drop **tous les fichiers** du dossier dans GitHub
6. Clique **"Commit changes"**

### Étape 2 : Déployer sur Vercel
1. Va sur **vercel.com** → connecte-toi avec GitHub
2. Clique **"Import Project"** → sélectionne `aurenis-customer`
3. Framework : **Vite** (auto-détecté)
4. Clique **"Deploy"**
5. En ~30 secondes tu as une URL live : `aurenis-customer.vercel.app`

### Étape 3 : Sécuriser la clé Google
1. Va dans **Google Cloud Console → Identifiants**
2. Clique sur ta clé API
3. Restrictions d'applications → **Sites Web**
4. Ajoute : `https://aurenis-customer.vercel.app`

---

## 💻 Option 2 : Lancer en local

```bash
# 1. Dézippe le dossier
# 2. Ouvre un terminal dans le dossier aurenis-deploy

npm install
npm run dev

# 3. Ouvre http://localhost:3000
```

---

## 🔑 Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| **Admin** | admin@aquatech.fr | Admin123 |
| **Tech** | ahmed@aquatech.fr | Créer un compte |
| **Tech** | lucas@aquatech.fr | Créer un compte |
| **Poseur** | rachid@aquatech.fr | Créer un compte |

---

## 📁 Structure

```
aurenis-deploy/
├── index.html          # Page HTML
├── package.json        # Dépendances
├── vite.config.js      # Config Vite
└── src/
    ├── main.jsx        # Entry point
    └── App.jsx         # Application complète
```
