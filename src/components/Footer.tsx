const Footer = () => {
  return (
    <footer className="bg-muted/20 border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Redux Reimagine
            </h3>
            <p className="text-foreground/60 text-sm">
              Tech solutions reimagined for modern businesses
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
          <p>© 2025 Redux Reimagine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
