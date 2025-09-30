# Lead App Blogger Template Documentation

This document explains how to customize and use the Lead App Blogger template.

## Template Structure

The template is organized into several main sections:

1. Header
   - Logo/Brand
   - Navigation Menu
   
2. Hero Section
   - Main headline
   - Description
   - Call-to-action buttons
   
3. Highlights Section
   - Project features in card layout
   
4. Amenities Section
   - Property amenities in card layout
   
5. Contact Section
   - Callback request form
   
6. Footer
   - Copyright information
   - Additional links

## Customization Guide

### 1. Changing Colors

The template uses CSS variables for consistent theming. You can modify these in the `<b:skin>` section:

```css
:root {
  --primary: #0b1f4e;
  --primary-light: #142b68;
  --primary-ribbon: #3050ff;
  --accent-blue: #2563eb;
  --accent-cyan: #0ea5e9;
  --accent-gold: #f59e0b;
  /* ... other variables ... */
}
```

### 2. Modifying Content

Each section is implemented as a Blogger widget that can be edited through the Blogger interface:

- Hero Content: Widget ID 'HTML1'
- Highlights: Widget ID 'HTML2'
- Amenities: Widget ID 'HTML3'
- Contact Form: Widget ID 'HTML4'

### 3. Navigation Menu

The navigation menu is implemented using Blogger's PageList widget. You can modify it through:
1. Layout > Nav Menu section
2. Add/remove pages
3. Rearrange items as needed

### 4. Contact Form

The template includes a basic contact form that displays a thank you message on submission. To integrate with your backend:

1. Locate the form submission code in the Custom Scripts section
2. Modify the submission handler to send data to your endpoint
3. Update success/error handling as needed

### 5. Responsive Design

The template is fully responsive with breakpoints at:
- Mobile: < 640px
- Tablet: 768px
- Desktop: 1180px

## Assets and Resources

The template uses:
1. Font Awesome 6.6.0 for icons
2. jQuery 3.6.0 for interactivity
3. Inter and Poppins fonts from Google Fonts

## Best Practices

1. Always preview changes before publishing
2. Test responsiveness across different devices
3. Keep widget content focused and concise
4. Optimize images before uploading
5. Regularly backup your template

## Need Help?

For additional support or customization:
1. Check Blogger's documentation
2. Review the template code comments
3. Contact the template developer
