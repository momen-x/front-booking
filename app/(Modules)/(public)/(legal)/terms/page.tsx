import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, FileText, Shield, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Your App Name",
  description:
    "Read our terms of service to understand the rules and guidelines for using our platform.",
};

const TermsOfService = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Last Updated: {lastUpdated}</span>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 md:p-8">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="space-y-8">
                {/* Agreement to Terms */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    1. Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using our platform, you agree to be bound by
                    these Terms of Service and all applicable laws and
                    regulations. If you do not agree with any part of these
                    terms, you may not use our services.
                  </p>
                </section>

                {/* User Accounts */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    2. User Accounts
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">
                      To use certain features of our platform, you must create
                      an account. You are responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Maintaining the confidentiality of your account
                        credentials
                      </li>
                      <li>All activities that occur under your account</li>
                      <li>
                        Providing accurate and complete registration information
                      </li>
                      <li>
                        Notifying us immediately of any unauthorized account
                        access
                      </li>
                    </ul>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    3. User Responsibilities
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Impersonate any person or entity</li>
                      <li>
                        Post or transmit harmful, offensive, or illegal content
                      </li>
                      <li>Interfere with or disrupt our services or servers</li>
                      <li>
                        Attempt to gain unauthorized access to any part of the
                        platform
                      </li>
                      <li>
                        Use the platform for any fraudulent or malicious purpose
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Content and Intellectual Property */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    4. Content and Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content available on our platform, including text,
                    graphics, logos, and software, is the property of our
                    company or our licensors and is protected by copyright and
                    other intellectual property laws. You may not reproduce,
                    distribute, or create derivative works without our explicit
                    permission.
                  </p>
                </section>

                {/* Provider Terms */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    5. Provider Terms (If Applicable)
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">
                      If you register as a service provider on our platform, you
                      agree to additional terms:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Provide accurate and truthful information about your
                        services
                      </li>
                      <li>
                        Fulfill all commitments made to users in a timely manner
                      </li>
                      <li>
                        Maintain appropriate licenses and insurance as required
                      </li>
                      <li>
                        Respond to user inquiries and requests professionally
                      </li>
                      <li>
                        Accept responsibility for the quality of your services
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Termination
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to terminate or suspend your account
                    immediately, without prior notice, for conduct that violates
                    these Terms of Service or is harmful to other users, us, or
                    third parties. Upon termination, your right to use the
                    platform will immediately cease.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    7. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by law, we shall not be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages arising from your use of or inability to
                    use our services.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    8. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We
                    will notify users of material changes through our platform
                    or via email. Your continued use of the platform after such
                    changes constitutes acceptance of the new terms.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="pt-4 border-t border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    9. Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <div className="mt-3 text-muted-foreground">
                    <p>Email: legal@yourapp.com</p>
                    <p>Address: 123 Business Street, City, Country</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
