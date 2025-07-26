import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/ui/FormField";
import { validateName, validateEmail, validateAddress, validatePassword } from "@/utils/validation";
import { mockUsers } from "@/utils/mockData";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.errors[0];
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errors[0];
    }

    if (mockUsers.some(user => user.email === formData.email)) {
      newErrors.email = "Email already exists";
    }

    const addressValidation = validateAddress(formData.address);
    if (!addressValidation.isValid) {
      newErrors.address = addressValidation.errors[0];
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
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
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        role: formData.role as 'admin' | 'user' | 'store_owner'
      };
      
      mockUsers.push(newUser);
      
      toast.success("User added successfully!");
      setFormData({ name: "", email: "", password: "", address: "", role: "" });
      setErrors({});
    } catch (error) {
      toast.error("Failed to add user");
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
          <UserPlus className="h-5 w-5" />
          Add New User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            id="name"
            value={formData.name}
            onChange={(value) => updateField('name', value)}
            placeholder="Enter full name (20-60 characters)"
            error={errors.name}
            required
          />
          
          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            placeholder="Enter email address"
            error={errors.email}
            required
          />
          
          <FormField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={(value) => updateField('password', value)}
            placeholder="8-16 chars, 1 uppercase, 1 special char"
            error={errors.password}
            required
          />
          
          <FormField
            label="Address"
            id="address"
            value={formData.address}
            onChange={(value) => updateField('address', value)}
            placeholder="Enter address (max 400 characters)"
            error={errors.address}
            multiline
            required
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Role <span className="text-destructive">*</span>
            </label>
            <Select value={formData.role} onValueChange={(value) => updateField('role', value)}>
              <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Normal User</SelectItem>
                <SelectItem value="store_owner">Store Owner</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Adding User..." : "Add User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};