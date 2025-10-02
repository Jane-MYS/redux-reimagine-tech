import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item: { id: string; href: string }) => {
    if (item.href === "/" && location.pathname === "/") {
      // On home page, scroll to section
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to different page
      navigate(item.href);
    }
    setIsMobileMenuOpen(false);
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password" || location.pathname === "/dashboard";
  const isPortalPage = location.pathname === "/projects" || location.pathname === "/tickets" || location.pathname === "/invoices";
  
  const navItems = isAuthPage 
    ? [{ label: "Home", id: "home", href: "/" }]
    : isPortalPage
    ? [{ label: "Dashboard", id: "dashboard", href: "/dashboard" }]
    : [
        { label: "Home", id: "home", href: "/" },
        { label: "About", id: "about", href: "/about" },
        { label: "Services", id: "services", href: "/" },
        { label: "Why Us", id: "why-us", href: "/" },
        { label: "Contact", id: "contact", href: "/" },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Redux Reimagine
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={isPortalPage ? "outline" : "ghost"}
                onClick={() => handleNavigation(item)}
                className={isPortalPage 
                  ? "border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors font-medium"
                  : "text-black hover:text-black transition-colors font-medium"
                }
              >
                {item.label}
              </Button>
            ))}
            {!isAuthPage && !isPortalPage && (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="mr-2"
                >
                  Client Login
                </Button>
                <Button
                  onClick={() => handleNavigation({ id: "contact", href: "/" })}
                  className="bg-gradient-to-r from-primary to-secondary text-background font-semibold hover:opacity-90 transition-opacity glow-primary"
                >
                  Book Consultation
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={isPortalPage ? "outline" : "ghost"}
                  onClick={() => handleNavigation(item)}
                  className={isPortalPage 
                    ? "border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors font-medium text-left py-2 justify-start"
                    : "text-black hover:text-black transition-colors font-medium text-left py-2 justify-start"
                  }
                >
                  {item.label}
                </Button>
              ))}
              {!isAuthPage && !isPortalPage && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="mt-2"
                  >
                    Client Login
                  </Button>
                  <Button
                    onClick={() => handleNavigation({ id: "contact", href: "/" })}
                    className="bg-gradient-to-r from-primary to-secondary text-background font-semibold mt-2"
                  >
                    Book Consultation
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
