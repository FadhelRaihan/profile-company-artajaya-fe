import { Copyright, Instagram, LucideProps, Mail, MapPin } from "lucide-react";
import { logo } from "@/assets/icons";
import { RefAttributes, useEffect } from "react";
import { usePhoneNumbersStore } from "@/store/phoneNumberStore";

const Footer = () => {
  const { fetchActivePhoneNumbers, activePhoneNumbers } = usePhoneNumbersStore();
  const selectedPhoneNumber = activePhoneNumbers.find(p => p.label === "Bendahara");
  const phoneNumber = selectedPhoneNumber?.phone_number;

  const formatPhoneForWA = (phone?: string) => {
  if (!phone) return undefined;
  // Hapus spasi atau karakter lain
  let formatted = phone.replace(/\D/g, "");
  // Ganti leading 0 menjadi 62
  if (formatted.startsWith("0")) {
    formatted = "62" + formatted.slice(1);
  }
  return formatted;
};

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/iympack.id/",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6 5.82C15.9166 5.03953 15.5399 4.0374 15.54 3H12.45V15.4C12.4267 16.0712 12.1436 16.7071 11.6603 17.1735C11.1771 17.6399 10.5316 17.9004 9.86003 17.9C8.44003 17.9 7.26003 16.74 7.26003 15.3C7.26003 13.58 8.92003 12.29 10.63 12.82V9.66C7.18003 9.2 4.16003 11.88 4.16003 15.3C4.16003 18.63 6.92003 21 9.85003 21C12.99 21 15.54 18.45 15.54 15.3V9.01C16.793 9.90985 18.2974 10.3926 19.84 10.39V7.3C19.84 7.3 17.96 7.39 16.6 5.82Z"
            fill="currentColor"
          />
        </svg>
      ),
      href: "https://www.tiktok.com/@iympack.id",
    },
    {
      name: "WhatsApp",
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.05 4.91005C18.1331 3.98416 17.0411 3.25002 15.8376 2.75042C14.634 2.25081 13.3431 1.99574 12.04 2.00005C6.58005 2.00005 2.13005 6.45005 2.13005 11.9101C2.13005 13.6601 2.59005 15.3601 3.45005 16.8601L2.05005 22.0001L7.30005 20.6201C8.75005 21.4101 10.38 21.8301 12.04 21.8301C17.5 21.8301 21.9501 17.3801 21.9501 11.9201C21.9501 9.27005 20.92 6.78005 19.05 4.91005ZM12.04 20.1501C10.56 20.1501 9.11005 19.7501 7.84005 19.0001L7.54005 18.8201L4.42005 19.6401L5.25005 16.6001L5.05005 16.2901C4.2276 14.9771 3.79097 13.4593 3.79005 11.9101C3.79005 7.37005 7.49005 3.67005 12.03 3.67005C14.23 3.67005 16.3 4.53005 17.85 6.09005C18.6177 6.85392 19.226 7.7626 19.6397 8.76338C20.0534 9.76417 20.2642 10.8371 20.26 11.9201C20.2801 16.4601 16.58 20.1501 12.04 20.1501ZM16.56 13.9901C16.31 13.8701 15.09 13.2701 14.87 13.1801C14.64 13.1001 14.48 13.0601 14.31 13.3001C14.14 13.5501 13.67 14.1101 13.53 14.2701C13.39 14.4401 13.24 14.4601 12.99 14.3301C12.74 14.2101 11.94 13.9401 11 13.1001C10.26 12.4401 9.77005 11.6301 9.62005 11.3801C9.48005 11.1301 9.60005 11.0001 9.73005 10.8701C9.84005 10.7601 9.98005 10.5801 10.1 10.4401C10.22 10.3001 10.27 10.1901 10.35 10.0301C10.43 9.86005 10.39 9.72005 10.33 9.60005C10.27 9.48005 9.77005 8.26005 9.57005 7.76005C9.37005 7.28005 9.16005 7.34005 9.01005 7.33005H8.53005C8.36005 7.33005 8.10005 7.39005 7.87005 7.64005C7.65005 7.89005 7.01005 8.49005 7.01005 9.71005C7.01005 10.9301 7.90005 12.1101 8.02005 12.2701C8.14005 12.4401 9.77005 14.9401 12.25 16.0101C12.84 16.2701 13.3 16.4201 13.66 16.5301C14.25 16.7201 14.79 16.6901 15.22 16.6301C15.7 16.5601 16.69 16.0301 16.89 15.4501C17.1 14.8701 17.1 14.3801 17.03 14.2701C16.96 14.1601 16.81 14.1101 16.56 13.9901Z"
            fill="currentColor"
          />
        </svg>
      ),
      href: "/contact",
    },
  ];

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Program", path: "/program" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Kontak Kami", path: "/kontak-kami" },
  ];

  const contactInfo = [
    { 
      label: "info@iympack.com", 
      icon: Mail, 
      path: "info@iympack.com" 
    },
    {
      label: phoneNumber,
      icon: (props: Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>) => socialLinks[2].icon(props),
      path: phoneNumber ? `https://wa.me/${formatPhoneForWA(phoneNumber)}` : undefined
    },
    { 
      label: "Alamat", 
      icon: MapPin, 
      path: "https://goo.gl/maps/..." 
    },
  ];

  useEffect(() => {
    fetchActivePhoneNumbers();
  }, [fetchActivePhoneNumbers]);

  return (
    <footer className="bg-[#2C4031] text-[#FFFFF0] font-family-['Geist']">
      <div className="mx-auto px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={logo}
                alt="IYMPACK Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">IYMPACK</span>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-1 hover:opacity-80 transition-opacity text-white"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start lg:items-end space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold mb-1">Kontak Kami</h3>
              {contactInfo.map((contact) => (
                <div key={contact.label} className="flex items-center gap-2 lg:justify-end">
                  {contact.path ? (
                    <a
                      href={contact.path}
                      className="text-base sm:text-lg text-left hover:underline"
                    >
                      {contact.label}
                    </a>
                  ) : (
                    <span className="text-base sm:text-lg text-left">{contact.label}</span>
                  )}
                  <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start lg:items-end space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-base sm:text-lg text-[#FFFFF0] font-semibold hover:opacity-80 transition-opacity"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#FFFFF0] mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Copyright className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-center">
              2025 Iympack. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
