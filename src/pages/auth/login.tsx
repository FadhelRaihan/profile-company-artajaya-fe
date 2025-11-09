import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Komponen opsional untuk menampilkan error input
function InputError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm">{message}</p>;
}

// Layout wrapper (jika kamu punya AuthLayout di project-mu)
function AuthLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow dark:bg-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setStatus(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        setErrors(result.errors || {});
        throw new Error("Login gagal");
      }

      // jika berhasil login, arahkan ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setStatus("Gagal login, periksa email atau password Anda.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AuthLayout
      title="Masuk ke Akun Anda"
      description="Masukkan email dan kata sandi Anda di bawah ini untuk masuk"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Email */}
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-200 font-medium transition-colors"
            >
              Alamat Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="nama@email.com"
            />
            <InputError message={errors.email} />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-200 font-medium transition-colors"
              >
                Kata Sandi
              </Label>
              <Link
                to="/forgot-password"
                className="ml-auto text-sm text-blue-600 hover:underline"
                tabIndex={5}
              >
                Lupa kata sandi?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Kata sandi"
            />
            <InputError message={errors.password} />
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onCheckedChange={(checked: boolean) =>
                setData({ ...data, remember: checked as boolean })
              }
              tabIndex={3}
            />
            <Label
              htmlFor="remember"
              className="text-gray-700 dark:text-gray-200 font-medium transition-colors"
            >
              Ingat saya
            </Label>
          </div>

          {/* Tombol Login */}
          <Button
            type="submit"
            className="mt-4 w-full transition-colors"
            tabIndex={4}
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Masuk
          </Button>
        </div>

        {/* Link ke Register */}
        <div className="text-center text-sm text-muted-foreground dark:text-white">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline" tabIndex={5}>
            Daftar
          </Link>
        </div>

        {/* Status Message */}
        {status && (
          <div className="mt-4 text-center text-sm font-medium text-red-600">
            {status}
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
