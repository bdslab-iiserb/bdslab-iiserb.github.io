# Publications Carousel - Setup Guide

## Adding Paper Screenshots

To add paper screenshots/previews to the publications carousel:

### 1. Create Screenshots
- Take screenshots of the first page of your papers
- Recommended size: 850px width × 1100px height (8.5:11 aspect ratio)
- Save as JPG or PNG format
- Name them descriptively (e.g., `paper-tcpnet-2024.png`)

### 2. Add to Images Folder
Place the screenshot files in:
```
/public/images/papers/
```

Create the `papers` folder if it doesn't exist:
```bash
mkdir -p public/images/papers
```

### 3. Update Publications Data
Edit `src/pages/Research.tsx` and add the `image` property to the publication object:

```typescript
{
  id: '2',
  title: 'TCPNet: A Novel Tumor Contour Prediction Network using MRIs',
  authors: 'Shraddha Agarwal, Vinod Kumar Kurmi, Abhirup Banerjee, Tanmay Basu',
  venue: 'IEEE International Conference on Healthcare Informatics',
  year: 2024,
  type: 'conference',
  link: 'https://ieeexplore.ieee.org/document/10785858',
  image: '/images/papers/paper-tcpnet-2024.png',  // Add this line
},
```

## Carousel Features

The publications carousel includes:
- ✅ Auto-scrolling (pauses on hover)
- ✅ Manual navigation with arrow buttons
- ✅ Dot indicators for each publication
- ✅ Smooth animations
- ✅ Direct links to papers
- ✅ Journal/Conference badges
- ✅ Responsive design

## Page Organization

The Research page now follows this structure:
1. **Research Focus** - Overview and interests
2. **Recent Publications** - Auto-scrolling carousel
3. **Project Spotlights** - Detailed project cards

## Customization

### Adjust Auto-scroll Speed
In `src/components/PublicationCarousel.tsx`, line 27:
```typescript
}, 4000); // Change this number (milliseconds)
```

### Modify Carousel Style
Edit the component styling in `PublicationCarousel.tsx` to match your design preferences.

### Add More Publications
Simply add more objects to the `publications` array in `Research.tsx`.
