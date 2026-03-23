# balconix.ge Domain Registration and Setup

## Step 1: Register balconix.ge

### Via Nic.ge (Recommended)

1. **Visit**: https://www.nic.ge
2. **Search** for "balconix.ge" in the domain search box
3. **Register** if available:
   - Click "Register Domain" or similar button
   - Create account if you don't have one
   - Fill in registrant information:
     - Name: ILSO GROUP or your business name
     - Address: Your business address in Georgia
     - Phone: +995 XXX XXX XXX
     - Email: georgemaevsky@gmail.com or business email

4. **Payment**:
   - Cost: ~30-50 GEL/year
   - Payment methods: Usually accept Georgian cards, bank transfer

5. **Wait for confirmation**: Usually instant, can take up to 24 hours

### Requirements for .ge Domains
- Can be registered by anyone (no restrictions)
- Need valid contact information
- Business registration not required for .ge (unlike .com.ge)

## Step 2: Configure DNS in Nic.ge

After registration, you need to configure DNS records:

### Via Nic.ge DNS Management

1. **Log in to Nic.ge account**
2. **Go to "My Domains"** or similar section
3. **Click on balconix.ge**
4. **Find "DNS Management"** or "Name Servers" section

### Option A: Use Custom DNS (Recommended - Cloudflare)

**Why Cloudflare?**
- Free DNS service
- Faster DNS propagation
- Better support for CNAME flattening (needed for root domain)
- Additional features (CDN, DDoS protection)

**Setup**:
1. Sign up at https://www.cloudflare.com
2. Add balconix.ge as a site
3. Cloudflare will scan your DNS records
4. Copy the nameservers Cloudflare provides (e.g., `name1.cloudflare.com`, `name2.cloudflare.com`)
5. **In Nic.ge**: Change nameservers to Cloudflare's nameservers
6. **In Cloudflare**: Add the DNS records below

### Option B: Use Nic.ge DNS Directly

If Nic.ge provides DNS management, add these records directly:

**DNS Records Needed**:

| Type  | Name/Host | Value/Target                                  | TTL  |
|-------|-----------|-----------------------------------------------|------|
| CNAME | www       | proud-cliff-0f66cbb03.6.azurestaticapps.net   | 3600 |
| CNAME | @         | proud-cliff-0f66cbb03.6.azurestaticapps.net   | 3600 |
| TXT   | _dnsauth  | (value from Azure - see Step 3)               | 3600 |
| TXT   | _dnsauth.www | (value from Azure - see Step 3)            | 3600 |

**Note**: Some DNS providers don't allow CNAME for root (@). If this is the case, use Cloudflare or only use www.balconix.ge

## Step 3: Add Domain to Azure Static Web Apps

### Via Azure Portal

1. **Open Azure Portal**: https://portal.azure.com

2. **Find Your Static Web App**:
   - Search for "Static Web Apps" in the top search bar
   - Click on your app (it should show: proud-cliff-0f66cbb03.6.azurestaticapps.net)

3. **Add Custom Domain**:
   - In left menu, click **"Custom domains"**
   - Click **"+ Add"** button
   - Select **"Custom domain on other DNS"**

4. **Add www.balconix.ge First**:
   - Enter: `www.balconix.ge`
   - Click **"Next"**
   - Azure will show you DNS records needed:
     ```
     CNAME record:
     Name: www
     Value: proud-cliff-0f66cbb03.6.azurestaticapps.net

     TXT record:
     Name: _dnsauth.www
     Value: [unique verification token]
     ```
   - **Copy these values** - you'll need them

5. **Add Root Domain balconix.ge**:
   - Click **"+ Add"** again
   - Enter: `balconix.ge`
   - Click **"Next"**
   - Azure will show you DNS records:
     ```
     ALIAS/ANAME/CNAME record:
     Name: @
     Value: proud-cliff-0f66cbb03.6.azurestaticapps.net

     TXT record:
     Name: _dnsauth
     Value: [unique verification token]
     ```
   - **Copy these values**

## Step 4: Add DNS Records

### If Using Cloudflare

1. **Log in to Cloudflare**
2. **Select balconix.ge domain**
3. **Go to DNS → Records**
4. **Add these records**:

| Type  | Name      | Content                                       | Proxy Status | TTL  |
|-------|-----------|-----------------------------------------------|--------------|------|
| CNAME | www       | proud-cliff-0f66cbb03.6.azurestaticapps.net   | DNS only ⚪  | Auto |
| CNAME | @         | proud-cliff-0f66cbb03.6.azurestaticapps.net   | DNS only ⚪  | Auto |
| TXT   | _dnsauth.www | [value from Azure]                         | DNS only     | Auto |
| TXT   | _dnsauth  | [value from Azure]                            | DNS only     | Auto |

**IMPORTANT**: Set Proxy Status to "DNS only" (gray cloud ⚪) during setup. You can enable proxy later.

### If Using Nic.ge DNS

Add the same records in Nic.ge's DNS management interface.

## Step 5: Verify Domain in Azure

1. **Wait 5-10 minutes** after adding DNS records
2. **Return to Azure Portal** → Custom domains
3. **Click "Validate"** next to `www.balconix.ge`
   - If successful, status will change to "Validated"
   - If failed, check DNS records and wait longer
4. **Click "Validate"** next to `balconix.ge`
5. **Wait for SSL certificate** (10-30 minutes)
   - Azure automatically provisions free SSL certificate
   - Status will change to "Ready" when complete

## Step 6: Test Your Domain

After SSL is ready:

1. **Visit**: https://www.balconix.ge
2. **Visit**: https://balconix.ge
3. **Verify**:
   - ✅ Website loads correctly
   - ✅ HTTPS padlock icon appears
   - ✅ All images and content load

**DNS Propagation Check**: https://dnschecker.org/#CNAME/www.balconix.ge

## Step 7: Update Application (Optional)

You may want to update references from the old URL to new domain:

### Update package.json homepage
```bash
cd FrontEnd
# Update homepage field if needed
```

### Update any hardcoded URLs in the application
Search for references to `proud-cliff-0f66cbb03.6.azurestaticapps.net` and update to `balconix.ge`

## Recommended DNS Configuration

**Best Practice**: Use both www and root domain, redirect root to www (or vice versa)

**Recommendation for balconix.ge**:
- Primary: `www.balconix.ge`
- Redirect: `balconix.ge` → `https://www.balconix.ge`

This is automatically handled by Azure Static Web Apps when both domains are configured.

## Troubleshooting

### "Domain is not validated"
- Wait 15-30 minutes after adding DNS records
- Check TXT records are correct: `nslookup -type=TXT _dnsauth.www.balconix.ge`
- Ensure no conflicting DNS records exist
- Try using Cloudflare instead of Nic.ge DNS

### "CNAME not allowed for root domain"
- Use Cloudflare (supports CNAME flattening)
- Or use only www.balconix.ge as primary domain

### SSL certificate not issued
- Ensure domain is validated first
- Wait up to 24 hours
- Check Azure portal for certificate status
- Contact Azure support if still pending after 48 hours

### Site loads but shows old GitHub Pages URL
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito/private browsing
- Check if DNS is propagated: https://dnschecker.org

## Timeline

- **Domain Registration**: Instant to 24 hours
- **DNS Propagation**: 5-30 minutes (Cloudflare) or 1-24 hours (Nic.ge)
- **SSL Certificate**: 10 minutes to 24 hours
- **Total Setup Time**: 30 minutes to 48 hours

## Cost Summary

- **Domain Registration**: 30-50 GEL/year (~$11-18)
- **DNS Hosting**: FREE (Cloudflare or Nic.ge included)
- **SSL Certificate**: FREE (Azure Static Web Apps)
- **Web Hosting**: FREE (Azure Static Web Apps free tier)
- **Total Annual Cost**: 30-50 GEL/year (~$11-18)

## Quick Command Reference

```bash
# Check DNS propagation for CNAME
nslookup www.balconix.ge

# Check DNS propagation for root domain
nslookup balconix.ge

# Check TXT record for www
nslookup -type=TXT _dnsauth.www.balconix.ge

# Check TXT record for root
nslookup -type=TXT _dnsauth.balconix.ge

# Test HTTPS
curl -I https://www.balconix.ge
```

## After Domain is Live

1. **Update Google Search Console** (if using)
   - Add new property for balconix.ge
   - Submit sitemap

2. **Update Social Media**
   - Update Facebook/Instagram links
   - Update business profiles

3. **Update Marketing Materials**
   - Business cards
   - Brochures
   - Email signatures

4. **Set up Email** (optional)
   - Consider setting up email@balconix.ge
   - Can use Google Workspace, Microsoft 365, or free options

## Support

- **Nic.ge Support**: info@nic.ge
- **Azure Support**: https://portal.azure.com → Support
- **Cloudflare Support**: https://support.cloudflare.com

---

**Current Status**:
- Azure Site: ✅ https://proud-cliff-0f66cbb03.6.azurestaticapps.net
- Domain: ⏳ balconix.ge (pending registration)
- Target: 🎯 https://www.balconix.ge
