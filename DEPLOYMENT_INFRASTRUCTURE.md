# Balconix Deployment & Infrastructure Documentation

**Project**: Balconix - Balcony Glazing Website
**Owner**: Giorgi Maevski (georgemaevsky@gmail.com)
**Date Created**: March 23, 2026
**Last Updated**: March 23, 2026

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Infrastructure Components](#infrastructure-components)
3. [Deployment Pipeline](#deployment-pipeline)
4. [Domain & DNS Configuration](#domain--dns-configuration)
5. [Authentication & Tokens](#authentication--tokens)
6. [Repository Structure](#repository-structure)
7. [Deployment Workflow](#deployment-workflow)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Source Code Repositories                  │
│  ┌──────────────────┐        ┌──────────────────┐          │
│  │   GitHub Repo    │        │ Azure DevOps Repo│          │
│  │ Giorgamose/      │◄──────►│ georgemaevsky/   │          │
│  │ balconix         │        │ Balconix         │          │
│  └──────────────────┘        └──────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                            │
│  ┌──────────────────────────────────────────┐               │
│  │        GitHub Actions Workflow            │               │
│  │  - Build React App (Vite)                │               │
│  │  - Deploy to GitHub Pages                │               │
│  │  - Deploy to Azure Static Web Apps       │               │
│  └──────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌──────────────────────┐    ┌──────────────────────────┐
│   GitHub Pages       │    │ Azure Static Web Apps    │
│   giorgamose.github. │    │ proud-cliff-0f66cbb03.6. │
│   io/balconix/       │    │ azurestaticapps.net      │
└──────────────────────┘    └──────────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────────┐
                            │  Cloudflare DNS          │
                            │  - balconix.com.ge       │
                            │  - www.balconix.com.ge   │
                            └──────────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────────┐
                            │   End Users              │
                            │   https://balconix.com.ge│
                            └──────────────────────────┘
```

### Technology Stack

**Frontend**:
- React 18
- TypeScript
- Vite (Build tool)
- Framer Motion (Animations)
- i18next (Internationalization)
- Tailwind CSS

**Infrastructure**:
- Azure Static Web Apps (Primary hosting)
- GitHub Pages (Secondary/backup hosting)
- Cloudflare (DNS management)
- GitHub Actions (CI/CD)
- Azure DevOps (Source control backup)

---

## Infrastructure Components

### 1. Azure Static Web Apps

**Resource Details**:
- **Name**: balconix (auto-generated URL)
- **URL**: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
- **Region**: Auto-assigned
- **Plan**: Free tier
- **Features**:
  - Automatic SSL/TLS certificates
  - Global CDN distribution
  - Automatic deployments
  - Custom domain support
  - Staging environments

**Deployment Token**:
```
[REDACTED - Stored in GitHub Secrets as AZURE_STATIC_WEB_APPS_API_TOKEN]
```
- Stored in GitHub Secrets as: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Used by: GitHub Actions workflow
- **Security**: This token is secret and should never be exposed in source code

### 2. GitHub Repository

**Repository**: https://github.com/Giorgamose/balconix

**Structure**:
```
balconix/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── FrontEnd/
│   ├── src/                    # React source code
│   ├── public/                 # Static assets
│   ├── dist/                   # Build output (gitignored)
│   ├── package.json            # Dependencies
│   ├── vite.config.ts          # Build configuration
│   └── tsconfig.json           # TypeScript config
├── azure-pipelines.yml         # Azure Pipelines config (not used)
├── GIT_COMMANDS.md            # Git reference
├── DOMAIN_SETUP.md            # Domain setup guide
├── BALCONIX.GE_SETUP.md       # Specific domain guide
└── DEPLOYMENT_INFRASTRUCTURE.md # This file
```

**GitHub Secrets**:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Azure deployment token
- `GITHUB_TOKEN`: Auto-provided by GitHub Actions

### 3. Azure DevOps

**Organization**: https://dev.azure.com/georgemaevsky

**Project**: Balconix
- **Project ID**: d1a71125-8f7c-42ec-8b22-c2af8d57f7c6

**Repository**:
- **Name**: Balconix
- **Repository ID**: db360065-56e6-4e4b-a223-891ef02b78d4
- **URL**: https://dev.azure.com/georgemaevsky/Balconix/_git/Balconix

**Pipeline**:
- **Name**: Balconix-StaticWebApp-Deploy
- **Pipeline ID**: 1
- **Status**: Created but not used (due to parallelism limitations)
- **Configuration**: azure-pipelines.yml

**Azure DevOps PAT (Personal Access Token)**:
```
[REDACTED - Stored securely in environment variables]
```
- **Permissions**: Full access
- **Used for**:
  - Git operations (push/pull)
  - Azure DevOps MCP server authentication
- **Stored in**:
  - Environment variable: `ADO_MCP_AUTH_TOKEN`
  - Git remote URL (embedded)
  - Claude Code config: `C:\Users\gmaevski\.claude.json`
- **Security**: Never commit this token to source control

### 4. GitHub Pages

**URL**: https://giorgamose.github.io/balconix/

**Configuration**:
- **Branch**: gh-pages
- **Source**: GitHub Actions deployment
- **Base Path**: /balconix/ (configured in vite.config.ts)

### 5. Cloudflare

**Account**: georgemaevsky@gmail.com

**Zone**: balconix.com.ge
- **Status**: Active
- **Plan**: Free

**Nameservers**:
- adaline.ns.cloudflare.com
- sullivan.ns.cloudflare.com

**DNS Records**:
| Type  | Name          | Content                                       | Proxy | TTL  |
|-------|---------------|-----------------------------------------------|-------|------|
| CNAME | www           | proud-cliff-0f66cbb03.6.azurestaticapps.net   | ⚪    | Auto |
| CNAME | @             | proud-cliff-0f66cbb03.6.azurestaticapps.net   | ⚪    | Auto |
| TXT   | _dnsauth.www  | [Azure verification token]                    | -     | Auto |
| TXT   | _dnsauth      | [Azure verification token]                    | -     | Auto |

**Cloudflare API Tokens**:

1. **DNS Edit Token** (Zone-specific):
```
[REDACTED - Cloudflare API Token]
```
- **Permissions**: Zone → DNS → Edit (for balconix.com.ge)
- **Status**: Initially created, connection issues
- **Not actively used**
- **Security**: Revoke and rotate tokens regularly

2. **DNS Edit Token v2** (Zone-specific):
```
[REDACTED - Cloudflare API Token]
```
- **Permissions**: Zone → DNS → Edit (for balconix.com.ge)
- **Status**: Created for verification
- **Used for**: Manual DNS verification
- **Security**: Revoke unused tokens via Cloudflare dashboard

### 6. Domain Registrar

**Domain**: balconix.com.ge
- **Registrar**: ge.domains (https://ge.domains/)
- **Registration Date**: March 23, 2026
- **Nameservers**: Updated to Cloudflare
- **Annual Cost**: ~30-50 GEL

---

## Deployment Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**Trigger**:
- Push to `main` branch
- Manual workflow dispatch

**Jobs**:

1. **Build and Deploy Job**:
   - **Runs on**: ubuntu-latest
   - **Working Directory**: ./FrontEnd

**Steps**:

1. **Checkout Code**
   - Action: `actions/checkout@v4`

2. **Setup Node.js**
   - Action: `actions/setup-node@v4`
   - Version: 20.x
   - Cache: npm

3. **Install Dependencies**
   ```bash
   npm ci
   ```

4. **Build for GitHub Pages**
   ```bash
   npm run build
   ```
   - Environment: `GITHUB_PAGES=true`
   - Base path: `/balconix/`

5. **Deploy to GitHub Pages**
   - Action: `peaceiris/actions-gh-pages@v3`
   - Target: `./FrontEnd/dist`

6. **Build for Azure**
   ```bash
   npm run build
   ```
   - Base path: `/` (root)

7. **Deploy to Azure Static Web Apps**
   - Action: `Azure/static-web-apps-deploy@v1`
   - Token: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Skip build: true (pre-built)
   - App location: `./FrontEnd/dist`

**Build Configuration** (vite.config.ts):
```typescript
export default defineConfig(() => ({
  plugins: [react()],
  // Dynamic base path based on environment
  base: process.env.GITHUB_PAGES === 'true' ? '/balconix/' : '/',
  // ... other config
}));
```

### Deployment Flow Diagram

```
Developer pushes to GitHub
         │
         ▼
GitHub Actions triggered
         │
         ├─► Install Node.js 20
         │
         ├─► npm ci (install dependencies)
         │
         ├─► Build #1 (with base: /balconix/)
         │    └─► Deploy to GitHub Pages
         │
         ├─► Build #2 (with base: /)
         │    └─► Deploy to Azure Static Web Apps
         │
         └─► Complete ✓
                │
                ▼
    Both sites updated simultaneously
```

---

## Domain & DNS Configuration

### Domain Setup Timeline

1. **Domain Registration** (March 23, 2026)
   - Registered: balconix.com.ge
   - Registrar: ge.domains

2. **Cloudflare Setup**
   - Added balconix.com.ge to Cloudflare
   - Configured DNS records
   - Updated nameservers at registrar

3. **Azure Custom Domain**
   - Added www.balconix.com.ge
   - Added balconix.com.ge (root)
   - Generated TXT verification records

4. **DNS Propagation**
   - Nameservers: 10 min - 4 hours
   - DNS records: 5-30 minutes
   - Full global propagation: Up to 48 hours

5. **SSL Certificate**
   - Azure auto-provisions free SSL
   - Certificate issuance: 10-30 minutes after validation

### DNS Verification Tokens

**For www.balconix.com.ge**:
- TXT Record Host: `_dnsauth.www`
- TXT Record Value: `[Generated by Azure during domain validation]`

**For balconix.com.ge**:
- TXT Record Host: `_dnsauth`
- TXT Record Value: `[Generated by Azure during domain validation]`

**Note**: These tokens are automatically generated by Azure when you add a custom domain and are unique to your deployment.

### URL Mapping

| URL                                           | Status | Purpose         |
|-----------------------------------------------|--------|-----------------|
| https://proud-cliff-0f66cbb03.6.azurestaticapps.net | ✅ | Azure default  |
| https://giorgamose.github.io/balconix/        | ✅ | GitHub Pages   |
| https://www.balconix.com.ge                   | ⏳ | Primary domain |
| https://balconix.com.ge                       | ⏳ | Root domain    |

---

## Authentication & Tokens

### Token Inventory

| Token Type | Value | Purpose | Storage Location | Expiration |
|------------|-------|---------|------------------|------------|
| Azure Static Web Apps Deployment Token | `[REDACTED]` | Deploy to Azure | GitHub Secrets | No expiry |
| Azure DevOps PAT | `[REDACTED]` | Git auth, MCP server | Multiple locations | User-defined |
| Cloudflare API Token #1 | `[REDACTED]` | DNS management | Revoked/Not used | User-defined |
| Cloudflare API Token #2 | `[REDACTED]` | DNS verification | Can be revoked | User-defined |
| GitHub Token | Auto-generated | GitHub Actions | Auto-provided | Per-run |

**Security Note**: All tokens above are sensitive credentials. Never commit actual token values to source control.

### Token Security Best Practices

**Implemented**:
- ✅ Tokens stored in GitHub Secrets (encrypted)
- ✅ Environment variables for local development
- ✅ Never committed to source control
- ✅ Limited scope API tokens (Cloudflare)

**Recommendations**:
- 🔄 Rotate tokens every 90 days
- 🔄 Use minimum required permissions
- 🔄 Delete unused tokens immediately
- 🔄 Monitor token usage in Azure DevOps

### Token Rotation Procedure

**When to rotate**:
- Every 90 days (best practice)
- After team member departure
- Suspected compromise
- After public exposure

**How to rotate**:

1. **Azure DevOps PAT**:
   - Go to: https://dev.azure.com/georgemaevsky/_usersSettings/tokens
   - Create new token with same permissions
   - Update in:
     - `C:\Users\gmaevski\.claude.json` (env.ADO_MCP_AUTH_TOKEN)
     - Git remote URLs
     - Environment variables
   - Revoke old token

2. **Azure Static Web Apps Token**:
   - Azure Portal → Static Web App → Manage deployment token
   - Reset token
   - Update GitHub Secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`

3. **Cloudflare API Tokens**:
   - Cloudflare Dashboard → API Tokens
   - Create new token
   - Delete old token

---

## Repository Structure

### Source Control Strategy

**Primary Repository**: GitHub (Giorgamose/balconix)
- Main development
- CI/CD trigger
- Public visibility (optional)

**Backup Repository**: Azure DevOps (georgemaevsky/Balconix)
- Mirrored from GitHub
- Manual sync required
- Private repository

**Sync Commands**:
```bash
# Push to both remotes
git push origin main
git push azure main

# Or push to both at once
git push origin main && git push azure main
```

### Branch Strategy

**Main Branch**: `main`
- Protected branch
- Requires clean build
- Auto-deploys on push

**Feature Branches**: `feature/*`
- Development work
- Create PR to merge to main

**Hotfix Branches**: `hotfix/*`
- Critical fixes
- Fast-track to production

### Git Remotes

```bash
# GitHub (primary)
origin  https://github.com/Giorgamose/balconix.git

# Azure DevOps (backup)
azure   https://PAT@dev.azure.com/georgemaevsky/Balconix/_git/Balconix
```

---

## Deployment Workflow

### Standard Deployment Process

1. **Developer makes changes locally**
   ```bash
   # Make code changes
   git add .
   git commit -m "Description of changes"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **GitHub Actions automatically**:
   - Detects push to main
   - Triggers workflow
   - Runs build (2x - once for each platform)
   - Deploys to both platforms
   - Completes in ~2-3 minutes

4. **Verify deployment**:
   - Check GitHub Actions status
   - Visit: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
   - Visit: https://giorgamose.github.io/balconix/

### Emergency Rollback

**If deployment breaks production**:

1. **Revert commit**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Or rollback to specific commit**:
   ```bash
   git reset --hard <commit-hash>
   git push origin main --force
   ```

3. **Monitor automatic re-deployment**

### Manual Deployment (if needed)

**Local build and test**:
```bash
cd FrontEnd
npm ci
npm run build
npm run preview  # Test locally
```

**Manual Azure deployment** (not recommended):
- Use Azure Static Web Apps CLI
- Or upload via Azure Portal

---

## Monitoring & Maintenance

### Health Check URLs

- **Azure**: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
- **GitHub Pages**: https://giorgamose.github.io/balconix/
- **Custom Domain**: https://www.balconix.com.ge (when active)

### Monitoring Points

**GitHub Actions**:
- Workflow runs: https://github.com/Giorgamose/balconix/actions
- Monitor for failed builds
- Check build duration (should be <3 minutes)

**Azure Portal**:
- Static Web App metrics
- Request count, response times
- Error rates
- Custom domain status

**Cloudflare Dashboard**:
- DNS status
- Traffic analytics
- Security events

### Regular Maintenance Tasks

**Weekly**:
- ✅ Check GitHub Actions for failures
- ✅ Verify both sites are accessible

**Monthly**:
- ✅ Review Azure usage/costs (should be $0)
- ✅ Check domain expiration
- ✅ Review Cloudflare analytics

**Quarterly**:
- ✅ Rotate authentication tokens
- ✅ Update dependencies (npm audit fix)
- ✅ Review and update documentation

**Annually**:
- ✅ Renew domain (balconix.com.ge)
- ✅ Review infrastructure setup
- ✅ Optimize build pipeline

---

## Troubleshooting

### Common Issues and Solutions

#### 1. GitHub Actions Deployment Fails

**Symptoms**: Red X on GitHub Actions, deployment doesn't update

**Checks**:
```bash
# View recent workflow runs
gh run list --limit 5

# View failed run details
gh run view <run-id> --log-failed
```

**Solutions**:
- Check for TypeScript errors in build
- Verify GitHub Secrets are set correctly
- Check Azure Static Web Apps token hasn't expired
- Review workflow logs for specific errors

#### 2. Azure Custom Domain Not Validating

**Symptoms**: Domain stuck in "Validating" status

**Checks**:
```bash
# Verify TXT records
nslookup -type=TXT _dnsauth.www.balconix.com.ge
nslookup -type=TXT _dnsauth.balconix.com.ge
```

**Solutions**:
- Wait 15-30 minutes for DNS propagation
- Verify TXT records in Cloudflare are correct
- Check nameservers are pointing to Cloudflare
- Delete and re-add custom domain in Azure

#### 3. Site Shows 404 or Old Content

**Symptoms**: Website not found or shows cached version

**Solutions**:
- Clear browser cache (Ctrl + Shift + Delete)
- Use incognito/private browsing
- Check deployment completed successfully
- Verify correct base path in vite.config.ts

#### 4. SSL Certificate Issues

**Symptoms**: Browser shows "Not Secure" warning

**Solutions**:
- Wait for Azure to provision SSL (10-30 min after validation)
- Verify domain is validated in Azure Portal
- Check custom domain status shows "Ready"
- Force HTTPS: Azure Static Web Apps auto-redirects

#### 5. Git Push Fails

**Symptoms**: Authentication errors when pushing

**Solutions**:
```bash
# Update Azure DevOps PAT in remote URL
git remote remove azure
git remote add azure https://NEW_PAT@dev.azure.com/georgemaevsky/Balconix/_git/Balconix

# Or update token in .claude.json
```

### Debug Commands

```bash
# Check DNS propagation
nslookup www.balconix.com.ge
nslookup balconix.com.ge

# Check nameservers
nslookup -type=NS balconix.com.ge

# Check CNAME records
nslookup -type=CNAME www.balconix.com.ge

# Check TXT records
nslookup -type=TXT _dnsauth.www.balconix.com.ge

# Test HTTPS
curl -I https://www.balconix.com.ge

# Check GitHub Actions
gh run list
gh run watch

# Check git remotes
git remote -v

# View deployment status
git log --oneline -5
```

---

## Cost Analysis

### Current Monthly Costs

| Service | Plan | Cost |
|---------|------|------|
| Azure Static Web Apps | Free Tier | $0.00 |
| GitHub Actions | Free (public repo) | $0.00 |
| GitHub Pages | Free (public repo) | $0.00 |
| Cloudflare | Free Plan | $0.00 |
| Azure DevOps | Free (5 users) | $0.00 |
| **Domain Registration** | balconix.com.ge | **~$1.50/month** |

**Total Monthly Cost**: ~$1.50 USD
**Total Annual Cost**: ~$18 USD (domain only)

### Scaling Considerations

**If traffic increases**:
- Azure Static Web Apps Free Tier: 100GB bandwidth/month
- Cloudflare Free Tier: Unlimited bandwidth
- GitHub Pages: 100GB bandwidth/month, 100GB storage

**Upgrade paths**:
- Azure Static Web Apps Standard: $9/month (custom features)
- Cloudflare Pro: $20/month (enhanced performance)

---

## Security Considerations

### Implemented Security Measures

✅ **HTTPS Everywhere**
- Azure auto-provisions SSL certificates
- Automatic HTTP to HTTPS redirect

✅ **Secrets Management**
- GitHub Secrets for sensitive tokens
- Environment variables for local dev
- No secrets in source code

✅ **Limited Permissions**
- Scoped API tokens (Cloudflare)
- Least privilege access

✅ **Source Control**
- Git history for audit trail
- Protected main branch

### Security Checklist

**Regular Tasks**:
- [ ] Rotate tokens every 90 days
- [ ] Review GitHub Actions logs for anomalies
- [ ] Monitor Azure for unauthorized access
- [ ] Check Cloudflare security events
- [ ] Update dependencies monthly
- [ ] Review access permissions quarterly

**Incident Response**:
1. Revoke compromised token immediately
2. Generate new token
3. Update all references
4. Review access logs
5. Document incident

---

## Appendix

### Contact Information

**Project Owner**: Giorgi Maevski
- Email: georgemaevsky@gmail.com
- Organization: ILSO GROUP

### Important Links

**Repositories**:
- GitHub: https://github.com/Giorgamose/balconix
- Azure DevOps: https://dev.azure.com/georgemaevsky/Balconix

**Hosting**:
- Azure Static Web Apps: https://portal.azure.com
- GitHub Pages: https://github.com/Giorgamose/balconix/settings/pages

**Domain & DNS**:
- Domain Registrar: https://ge.domains/
- Cloudflare: https://dash.cloudflare.com
- DNS Checker: https://dnschecker.org

**CI/CD**:
- GitHub Actions: https://github.com/Giorgamose/balconix/actions
- Azure Pipelines: https://dev.azure.com/georgemaevsky/Balconix/_build

### Related Documentation

- [GIT_COMMANDS.md](GIT_COMMANDS.md) - Git commands reference
- [DOMAIN_SETUP.md](DOMAIN_SETUP.md) - Domain setup guide
- [BALCONIX.GE_SETUP.md](BALCONIX.GE_SETUP.md) - Specific domain instructions
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) - CI/CD configuration

---

**Document Version**: 1.0
**Last Updated**: March 23, 2026
**Next Review**: June 23, 2026
