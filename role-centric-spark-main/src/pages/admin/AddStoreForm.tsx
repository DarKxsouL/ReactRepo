import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/FormField";
import { validateEmail, validateAddress } from "@/utils/validation";
import { mockStores } from "@/utils/mockData";
import { toast } from "sonner";
import { Store } from "lucide-react";

export const AddStoreForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Store name must be at least 2 characters";
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errors[0];
    }

    if (mockStores.some(store => store.email === formData.email)) {
      newErrors.email = "Email already exists";
    }

    const addressValidation = validateAddress(formData.address);
    if (!addressValidation.isValid) {
      newErrors.address = addressValidation.errors[0];
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    setIsLoading(true);

    try {
      const newStore = {
        id: Date.now().toString(),
        ...formData,
        ownerId: Date.now().toString() + "_owner",
        avgRating: 0,
        totalRatings: 0
      };
      
      mockStores.push(newStore);
      
      toast.success("Store added successfully!");
      setFormData({ name: "", email: "", address: "" });
      setErrors({});
    } catch (error) {
      toast.error("Failed to add store");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Add New Store
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Store Name"
            id="storeName"
            value={formData.name}
            onChange={(value) => updateField('name', value)}
            placeholder="Enter store name"
            error={errors.name}
            required
          />
          
          <FormField
            label="Email"
            id="storeEmail"
            type="email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            placeholder="Enter store email address"
            error={errors.email}
            required
          />
          
          <FormField
            label="Address"
            id="storeAddress"
            value={formData.address}
            onChange={(value) => updateField('address', value)}
            placeholder="Enter store address (max 400 characters)"
            error={errors.address}
            multiline
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Adding Store..." : "Add Store"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};