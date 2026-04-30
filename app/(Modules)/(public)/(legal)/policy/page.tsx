import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Lock, Database, Cookie, Mail, Eye } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Your App Name",
  description:
    "Learn how we collect, use, and protect your personal information.",
};

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Privacy Policy
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
                {/* Introduction */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to our Privacy Policy. Your privacy is important to
                    us. This document explains how we collect, use, disclose,
                    and safeguard your information when you use our platform.
                    Please read this privacy policy carefully.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    1. Information We Collect
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Personal Information
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Name, email address, and contact information</li>
                        <li>
                          Profile information (username, profile picture, bio)
                        </li>
                        <li>Account credentials (password is encrypted)</li>
                        <li>
                          Payment information (processed securely by third
                          parties)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Usage Data
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Browser type and version</li>
                        <li>Pages you visit and time spent</li>
                        <li>IP address and device information</li>
                        <li>Interaction with our platform features</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use the collected information for various purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>To create and manage your account</li>
                    <li>To provide and maintain our services</li>
                    <li>To improve and personalize your experience</li>
                    <li>
                      To communicate with you about updates and promotions
                    </li>
                    <li>To process transactions and send confirmations</li>
                    <li>To detect and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                {/* Cookies and Tracking */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Cookie className="h-5 w-5 text-primary" />
                    3. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to track
                    activity on our platform and store certain information. You
                    can instruct your browser to refuse all cookies or to
                    indicate when a cookie is being sent. However, some features
                    may not function properly without cookies.
                  </p>
                </section>

                {/* Data Sharing and Disclosure */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    4. Data Sharing and Disclosure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell your personal information. We may share your
                    information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                    <li>
                      With service providers who assist in operating our
                      platform
                    </li>
                    <li>
                      With other users when you interact publicly (e.g., profile
                      information)
                    </li>
                    <li>
                      To comply with legal requirements or protect rights and
                      safety
                    </li>
                    <li>
                      In connection with a business transfer (merger,
                      acquisition, or sale)
                    </li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    5. Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures to protect
                    your personal information. However, no method of
                    transmission over the Internet or electronic storage is 100%
                    secure. While we strive to use commercially acceptable means
                    to protect your data, we cannot guarantee absolute security.
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Your Rights and Choices
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Depending on your location, you may have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and receive a copy of your personal data</li>
                      <li>Request correction or deletion of your data</li>
                      <li>Object to or restrict data processing</li>
                      <li>Request data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                    <p className="mt-3">
                      To exercise these rights, please contact us using the
                      information below.
                    </p>
                  </div>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    7. Data Retention
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this Privacy
                    Policy. When you delete your account, we will delete or
                    anonymize your personal information, unless we are required
                    to retain it for legal compliance.
                  </p>
                </section>

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    8. Children&apos;s Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children. If you believe we have collected information from
                    a child, please contact us immediately.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    9. Changes to This Privacy Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the {'"Last Updated"'} date. You are
                    advised to review this Privacy Policy periodically for any
                    changes.
                  </p>
                </section>

                {/* Contact Us */}
                <section className="pt-4 border-t border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    10. Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions or concerns about this Privacy Policy,
                    please contact us:
                  </p>
                  <div className="mt-3 text-muted-foreground">
                    <p>Email: privacy@yourapp.com</p>
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

export default PrivacyPolicy;
