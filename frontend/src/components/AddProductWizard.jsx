import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, FileText, Image as ImageIcon, Check, ChevronRight, ChevronLeft, Upload, X } from 'lucide-react';
import axios from 'axios';

const steps = [
  { id: 1, title: 'Basic Info', icon: Package, description: 'Product name and category' },
  { id: 2, title: 'Details', icon: FileText, description: 'Description and pricing' },
  { id: 3, title: 'Media', icon: ImageIcon, description: 'Upload images' },
  { id: 4, title: 'Review', icon: Check, description: 'Review details' },
];

const categories = ['Books', 'Electronics', 'Lab Gear', 'Furniture', 'Clothing', 'Sports', 'Other'];

const conditions = [
  { value: 'new', label: 'New', description: 'Brand new, never used' },
  { value: 'like-new', label: 'Like New', description: 'Used briefly, perfect condition' },
  { value: 'good', label: 'Good', description: 'Used, minor signs of wear' },
  { value: 'fair', label: 'Fair', description: 'Noticeable wear, but functional' },
];

export function AddProductWizard({ onClose, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '', category: '', condition: 'good', price: '', originalPrice: '', description: '', image: null,
  });
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Name required';
      if (!formData.category) newErrors.category = 'Category required';
    } else if (step === 2) {
      if (!formData.price) newErrors.price = 'Price required';
      if (!formData.description.trim()) newErrors.description = 'Description required';
    } else if (step === 3) {
      if (!formData.image) newErrors.image = 'Upload an image to boost sales';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      const token = localStorage.getItem("token");
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to create product' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <label className="block font-bold text-slate-700 mb-2">Product Name <span className="text-rose-500">*</span></label>
              <input type="text" value={formData.title} onChange={e => updateField('title', e.target.value)} className="aurora-input" placeholder="e.g. Calculus Textbook" />
              {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-3">Category <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateField('category', cat)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 ${formData.category === cat ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-aurora' : 'bg-white border-slate-200 text-slate-500 hover:border-purple-300'
                      }`}
                  >{cat}</button>
                ))}
              </div>
              {errors.category && <p className="mt-1 text-sm text-rose-500">{errors.category}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-3">Condition</label>
              <div className="space-y-3">
                {conditions.map(cond => (
                  <button key={cond.value} onClick={() => updateField('condition', cond.value)} className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${formData.condition === cond.value ? 'bg-purple-50 border-purple-400' : 'bg-white border-slate-200 hover:border-purple-200'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${formData.condition === cond.value ? 'border-purple-500' : 'border-slate-300'}`}>
                      {formData.condition === cond.value && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                    </div>
                    <div>
                      <p className={`font-bold ${formData.condition === cond.value ? 'text-purple-800' : 'text-slate-700'}`}>{cond.label}</p>
                      <p className="text-sm text-slate-500">{cond.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2">Price (₹) <span className="text-rose-500">*</span></label>
                <input type="number" value={formData.price} onChange={e => updateField('price', e.target.value)} className="aurora-input" placeholder="299" />
                {errors.price && <p className="mt-1 text-sm text-rose-500">{errors.price}</p>}
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-2">Original Price</label>
                <input type="number" value={formData.originalPrice} onChange={e => updateField('originalPrice', e.target.value)} className="aurora-input" placeholder="Optional" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-2">Description <span className="text-rose-500">*</span></label>
              <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} rows={5} className="aurora-input resize-none" placeholder="Provide detailed info..." />
              {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description}</p>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <label className="block font-bold text-slate-700 mb-4">Product Showcase Image <span className="text-rose-500">*</span></label>
            {previewImage ? (
              <div className="relative">
                <img src={previewImage} alt="Preview" className="w-full h-64 object-cover rounded-2xl shadow-sm border-2 border-purple-100" />
                <button onClick={() => { setPreviewImage(null); setFormData(prev => ({ ...prev, image: null })); }} className="absolute top-4 right-4 p-2 rounded-full bg-white text-rose-500 shadow-md">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-purple-300 rounded-2xl bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors">
                <Upload className="w-12 h-12 text-purple-400 mb-4" />
                <span className="font-bold text-purple-700 mb-1">Click to upload</span>
                <span className="text-sm text-purple-500 opacity-80">High quality images sell faster!</span>
                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
            )}
            {errors.image && <p className="mt-2 text-sm text-rose-500 font-medium text-center">{errors.image}</p>}
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-extrabold text-xl text-slate-800 mb-4 border-b border-slate-200 pb-3">Final Review</h3>
              {previewImage && <img src={previewImage} className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm" alt="product" />}

              <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div><p className="text-slate-500 font-medium">Name</p><p className="font-bold text-slate-800">{formData.title}</p></div>
                <div><p className="text-slate-500 font-medium">Category</p><p className="font-bold text-slate-800">{formData.category}</p></div>
                <div><p className="text-slate-500 font-medium">Price</p><p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-lg">₹{formData.price}</p></div>
                <div><p className="text-slate-500 font-medium">Condition</p><p className="font-bold text-slate-800 uppercase text-xs mt-1 bg-slate-100 py-1 px-2 rounded-md inline-block">{formData.condition}</p></div>
              </div>
            </div>
            {errors.submit && <div className="p-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-medium">{errors.submit}</div>}
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white/90 backdrop-blur-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-[32px] shadow-2xl border border-white">

        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-200/60 bg-white/50">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2"><Package className="text-purple-600" /> Add Listing</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-200/60">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => {
              const active = step.id === currentStep;
              const done = step.id < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${active ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-110 shadow-aurora' : done ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {done ? <Check size={18} /> : step.id}
                  </div>
                  <span className={`absolute -bottom-6 text-[10px] sm:text-xs font-bold whitespace-nowrap ${active ? 'text-purple-600' : 'text-slate-400'}`}>{step.title}</span>
                </div>
              );
            })}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-200 -z-0"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

        <div className="px-6 py-5 flex items-center justify-between bg-slate-50/80 border-t border-slate-200/60 rounded-b-[32px]">
          <button onClick={handleBack} disabled={currentStep === 1} className={`flex items-center gap-2 font-bold px-4 py-2 ${currentStep === 1 ? 'text-slate-300' : 'text-slate-500 hover:text-purple-600'}`}>
            <ChevronLeft size={20} /> Back
          </button>

          {currentStep < steps.length ? (
            <button onClick={handleNext} className="btn-aurora px-8 py-3 uppercase text-sm tracking-wide">Next Step <ChevronRight size={18} /></button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="btn-aurora !bg-none !bg-emerald-500 hover:!bg-emerald-600 shadow-lg shadow-emerald-500/30 px-8 py-3 text-sm uppercase tracking-wide">
              {isSubmitting ? 'Publishing...' : 'Publish Listing'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AddProductWizard;
