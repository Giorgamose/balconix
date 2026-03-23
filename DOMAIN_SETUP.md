# Custom Domain Setup for Balconix

## Overview

This guide will help you set up a custom domain for your Balconix website currently hosted at:
- Azure Static Web Apps: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
- GitHub Pages: https://giorgamose.github.io/balconix/

## Step 1: Choose and Register a Domain

### Recommended Domain Names
- balconix.ge (Georgia-specific)
- balconix.com
- balconixgeorgia.com
- ilsogroup-balconix.com

### Domain Registrars
1. **Namecheap** - https://www.namecheap.com (Recommended for international domains)
2. **GoDaddy** - https://www.godaddy.com
3. **Nic.ge** - https://www.nic.ge (For .ge domains)
4. **Cloudflare Registrar** - https://www.cloudflare.com/products/registrar/

**Cost**: Typically $10-15/year for .com, varies for .ge

## Step 2: Add Custom Domain to Azure Static Web App

### Via Azure Portal

1. **Open Azure Portal**: https://portal.azure.com
2. **Navigate to your Static Web App**:
   - Search for "Static Web Apps" in the search bar
   - Click on your app (the one with URL: proud-cliff-0f66cbb03.6.azurestaticapps.net)
3. **Add Custom Domain**:
   - Click "Custom domains" in the left menu
   - Click "+ Add"
   - Select "Custom domain on other DNS"
   - Enter your domain name (e.g., www.balconix.com or balconix.com)
   - Click "Next"

4. **Note the DNS Records**:
   Azure will show you the required DNS records:
   - **CNAME or ALIAS record** for the domain
   - **TXT record** for domain verification

## Step 3: Configure DNS Records

### For www.yourdomain.com (CNAME - Recommended)

Add these records in your domain registrar's DNS settings:

```
Type: CNAME
Name: www
Value: proud-cliff-0f66cbb03.6.azurestaticapps.net
TTL: 3600 (or Auto)
```

```
Type: TXT
Name: _dnsauth.www
Value: <value provided by Azure>
TTL: 3600
```

### For Root Domain (yourdomain.com)

Some registrars support ALIAS/ANAME records:

```
Type: ALIAS (or ANAME)
Name: @
Value: proud-cliff-0f66cbb03.6.azurestaticapps.net
TTL: 3600
```

```
Type: TXT
Name: _dnsauth
Value: <value provided by Azure>
TTL: 3600
```

**Note**: If your registrar doesn't support ALIAS records, you may need to:
1. Use only the www subdomain, OR
2. Use Cloudflare (which supports CNAME flattening)

## Step 4: Specific Registrar Instructions

### Namecheap

1. Log in to Namecheap
2. Go to "Domain List" → Click "Manage" next to your domain
3. Click "Advanced DNS"
4. Add the following records:

| Type  | Host      | Value                                         | TTL  |
|-------|-----------|-----------------------------------------------|------|
| CNAME | www       | proud-cliff-0f66cbb03.6.azurestaticapps.net   | Auto |
| TXT   | _dnsauth.www | (value from Azure)                         | Auto |

5. If you want root domain redirect:
   - Add URL Redirect Record: @ → http://www.yourdomain.com

### Cloudflare (Recommended for Root Domain)

1. Log in to Cloudflare
2. Add your domain (if not already added)
3. Go to DNS settings
4. Add records:

| Type  | Name      | Content                                       | Proxy | TTL  |
|-------|-----------|-----------------------------------------------|-------|------|
| CNAME | www       | proud-cliff-0f66cbb03.6.azurestaticapps.net   | DNS only (gray cloud) | Auto |
| CNAME | @         | proud-cliff-0f66cbb03.6.azurestaticapps.net   | DNS only (gray cloud) | Auto |
| TXT   | _dnsauth  | (value from Azure)                            | -     | Auto |

**Important**: Disable Cloudflare proxy (use DNS only mode) during initial setup.

### GoDaddy

1. Log in to GoDaddy
2. Go to "My Products" → Find your domain → "DNS"
3. Add records:

| Type  | Name      | Value                                         | TTL     |
|-------|-----------|-----------------------------------------------|---------|
| CNAME | www       | proud-cliff-0f66cbb03.6.azurestaticapps.net   | 1 Hour  |
| TXT   | _dnsauth.www | (value from Azure)                         | 1 Hour  |

## Step 5: Verify Domain in Azure

1. After adding DNS records, wait 5-10 minutes for DNS propagation
2. Return to Azure Portal → Custom domains
3. Click "Validate" next to your domain
4. If validation succeeds, Azure will automatically provision a free SSL certificate
5. Wait 10-15 minutes for SSL certificate to be issued

## Step 6: Test Your Domain

After SSL is provisioned:

1. Visit your domain: https://www.yourdomain.com
2. Verify it loads your Balconix website
3. Check that HTTPS is working (padlock icon in browser)

## DNS Propagation

DNS changes can take:
- **5-10 minutes**: For most changes to take effect
- **24-48 hours**: For complete global propagation

Check DNS propagation: https://dnschecker.org

## Troubleshooting

### Domain not validating
- Wait 10-15 minutes after adding DNS records
- Verify TXT record is correctly added (use dnschecker.org)
- Ensure no conflicting DNS records exist

### SSL certificate not provisioning
- Verify domain is validated first
- Wait up to 24 hours for certificate issuance
- Ensure you're using the correct domain format (www vs root)

### Site not loading
- Check DNS propagation status
- Clear browser cache (Ctrl+F5)
- Try incognito/private browsing mode
- Verify DNS records are correct in your registrar

## Azure Static Web Apps Free SSL

Azure Static Web Apps includes:
- ✅ Free SSL/TLS certificate
- ✅ Automatic certificate renewal
- ✅ HTTPS redirect (HTTP → HTTPS)
- ✅ Multiple custom domains support
- ✅ Apex domain support (with proper DNS configuration)

## Multiple Domain Support

You can add multiple domains pointing to the same site:
- balconix.com
- www.balconix.com
- balconix.ge

## Recommended Setup

**Best Practice**:
1. Set up both root and www subdomain
2. Choose one as primary (e.g., www.balconix.com)
3. Redirect the other to the primary

Example: balconix.com → www.balconix.com (recommended)

## Next Steps After Domain Setup

1. Update Google Analytics (if using)
2. Update social media links
3. Submit new domain to Google Search Console
4. Update email signatures and marketing materials

## Useful Commands

```bash
# Check DNS records
nslookup www.yourdomain.com

# Check TXT record
nslookup -type=TXT _dnsauth.www.yourdomain.com

# Test HTTPS certificate
curl -vI https://www.yourdomain.com
```

## Cost Summary

- **Domain Registration**: $10-15/year (.com) or varies (.ge)
- **SSL Certificate**: FREE (included with Azure Static Web Apps)
- **Hosting**: FREE (Azure Static Web Apps free tier)

## Support Resources

- **Azure Static Web Apps Docs**: https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

**Current Azure Static Web App URL**: https://proud-cliff-0f66cbb03.6.azurestaticapps.net
