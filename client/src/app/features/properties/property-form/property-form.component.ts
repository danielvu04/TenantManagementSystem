import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  editMode = false;
  propertyId: string;
  isSubmitting = false;
  imagePreviewUrls: string[] = [];
  
  // Sample property data for editing mode
  sampleProperties = [
    {
      id: '1',
      name: 'Millpond Apartments',
      address: '123 Riverside Drive, New York, NY',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      type: 'Apartment',
      status: 'Available',
      description: 'Luxurious riverside apartments with stunning views of the city skyline. These modern living spaces feature floor-to-ceiling windows, premium appliances, and access to top-tier amenities including a rooftop pool, fitness center, and resident lounge.',
      features: [
        'Central Air Conditioning',
        'In-unit Washer/Dryer',
        'Hardwood Floors',
        'Stainless Steel Appliances',
        'Walk-in Closets',
        'Private Balcony',
        'Pet Friendly',
        'Fitness Center',
        'Swimming Pool',
        'Concierge Service'
      ],
      images: [
        '/assets/images/property1-1.jpg',
        '/assets/images/property1-2.jpg',
        '/assets/images/property1-3.jpg',
        '/assets/images/property1-4.jpg'
      ],
      agent: {
        name: 'Sarah Johnson',
        phone: '(555) 123-4567',
        email: 'sarah.j@anhuaproperties.com',
        image: '/assets/images/agent1.jpg'
      }
    },
    {
      id: '2',
      name: 'The Metropolitan',
      address: '456 Central Park West, New York, NY',
      price: 3200,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1500,
      type: 'Condo',
      status: 'Available',
      description: 'Elegant condominiums located in the heart of the city, offering spacious living areas and premium finishes. The Metropolitan features high ceilings, gourmet kitchens, and spa-like bathrooms, all within walking distance to parks, shopping, and fine dining.',
      features: [
        'Doorman Building',
        'Elevator',
        'Granite Countertops',
        'Marble Bathrooms',
        'Walk-in Closets',
        'Home Office Space',
        'Rooftop Terrace',
        'Garage Parking',
        'Storage Unit',
        'Bike Room'
      ],
      images: [
        '/assets/images/property2-1.jpg',
        '/assets/images/property2-2.jpg',
        '/assets/images/property2-3.jpg',
        '/assets/images/property2-4.jpg'
      ],
      agent: {
        name: 'Michael Chen',
        phone: '(555) 987-6543',
        email: 'michael.c@anhuaproperties.com',
        image: '/assets/images/agent2.jpg'
      }
    }
  ];

  // Property types for dropdown
  propertyTypes = [
    'Apartment',
    'Condo',
    'House',
    'Townhouse',
    'Loft',
    'Studio'
  ];

  // Property status options
  propertyStatus = [
    'Available',
    'Pending',
    'Rented',
    'Sold'
  ];

  // Common property features for checkboxes
  commonFeatures = [
    'Air Conditioning',
    'Balcony',
    'Dishwasher',
    'Elevator',
    'Fitness Center',
    'Furnished',
    'Garage',
    'Hardwood Floors',
    'In-unit Laundry',
    'Parking',
    'Pet Friendly',
    'Pool',
    'Security System',
    'Storage',
    'Walk-in Closets'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.editMode = !!this.propertyId;
    
    if (this.editMode) {
      this.loadProperty();
    }
  }

  initForm(): void {
    this.propertyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      bedrooms: [null, [Validators.required, Validators.min(0)]],
      bathrooms: [null, [Validators.required, Validators.min(0)]],
      sqft: [null, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      status: ['Available', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      features: this.fb.array([]),
      customFeatures: this.fb.array([
        this.fb.control('')
      ]),
      agent: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        image: ['']
      }),
      images: this.fb.array([])
    });
  }

  loadProperty(): void {
    // In a real app, this would be an API call
    const property = this.sampleProperties.find(p => p.id === this.propertyId);
    
    if (!property) {
      this.router.navigate(['/properties']);
      return;
    }
    
    // Clear existing features array
    while (this.featuresArray.length) {
      this.featuresArray.removeAt(0);
    }
    
    // Add each feature to the form array
    property.features.forEach(feature => {
      if (this.commonFeatures.includes(feature)) {
        this.featuresArray.push(this.fb.control(feature));
      } else {
        this.customFeaturesArray.push(this.fb.control(feature));
      }
    });
    
    // Clear existing images array
    while (this.imagesArray.length) {
      this.imagesArray.removeAt(0);
    }
    
    // Add each image URL to the form array
    property.images.forEach(imageUrl => {
      this.imagesArray.push(this.fb.control(imageUrl));
      this.imagePreviewUrls.push(imageUrl);
    });
    
    // Update the rest of the form with property values
    this.propertyForm.patchValue({
      name: property.name,
      address: property.address,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      type: property.type,
      status: property.status,
      description: property.description,
      agent: property.agent
    });
  }

  get featuresArray(): FormArray {
    return this.propertyForm.get('features') as FormArray;
  }

  get customFeaturesArray(): FormArray {
    return this.propertyForm.get('customFeatures') as FormArray;
  }

  get imagesArray(): FormArray {
    return this.propertyForm.get('images') as FormArray;
  }

  onFeatureChange(feature: string, isChecked: boolean): void {
    const featuresArray = this.featuresArray;
    
    if (isChecked) {
      featuresArray.push(this.fb.control(feature));
    } else {
      const index = featuresArray.controls.findIndex(control => control.value === feature);
      if (index !== -1) {
        featuresArray.removeAt(index);
      }
    }
  }

  isFeatureSelected(feature: string): boolean {
    return this.featuresArray.controls.some(control => control.value === feature);
  }

  addCustomFeature(): void {
    this.customFeaturesArray.push(this.fb.control(''));
  }

  removeCustomFeature(index: number): void {
    this.customFeaturesArray.removeAt(index);
  }

  onImageUpload(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        // In a real app, we would upload the file to a server and get back the URL
        // For now, we'll just use the data URL
        const imageUrl = e.target.result;
        this.imagesArray.push(this.fb.control(imageUrl));
        this.imagePreviewUrls.push(imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.imagesArray.removeAt(index);
    this.imagePreviewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    // Combine regular features and custom features
    const features = [
      ...this.featuresArray.value,
      ...this.customFeaturesArray.value.filter(f => f && f.trim() !== '')
    ];
    
    const formValue = {
      ...this.propertyForm.value,
      features
    };
    
    delete formValue.customFeatures; // Remove the separate array
    
    // In a real app, we would make an API call here
    console.log('Form submitted with values:', formValue);
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      // Redirect to the property list or detail page
      this.router.navigate(['/properties']);
    }, 1000);
  }

  // Form field validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.propertyForm.get(fieldName);
    return field.invalid && (field.dirty || field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.propertyForm.get(fieldName);
    
    if (field.errors?.required) {
      return 'This field is required';
    }
    
    if (field.errors?.minlength) {
      return `Minimum length is ${field.errors.minlength.requiredLength} characters`;
    }
    
    if (field.errors?.min) {
      return `Minimum value is ${field.errors.min.min}`;
    }
    
    if (field.errors?.email) {
      return 'Please enter a valid email address';
    }
    
    return 'Invalid field';
  }
}
