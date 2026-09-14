
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account or register for services</li>
                  <li>Contact us through our contact forms</li>
                  <li>Subscribe to our newsletter or notifications</li>
                  <li>Make donations or payments</li>
                  <li>Participate in church events or activities</li>
                </ul>
                <p>This information may include your name, email address, phone number, address, and payment information.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process donations and payments</li>
                  <li>Send you updates about church events and activities</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you technical notices and security alerts</li>
                  <li>Provide spiritual care and pastoral support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our website and conducting church business, provided they agree to keep this information confidential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">4. Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">5. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our website may use cookies and similar tracking technologies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser. You can choose to disable cookies through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">6. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>Our website may contain links to third-party websites or integrate with third-party services, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Social media platforms (Facebook, YouTube)</li>
                  <li>Payment processors for donations</li>
                  <li>Email services for newsletters</li>
                  <li>Live streaming platforms</li>
                </ul>
                <p>These third parties have their own privacy policies, and we encourage you to review them.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">7. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our website is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to remove that information from our servers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">8. Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of certain communications</li>
                  <li>Request a copy of your personal information</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided below.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">9. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
                <br /><br />
                End Time Message Ministry<br />
                Lilongwe, Central Region, Malawi<br />
                Email: privacy@etmministry.org<br />
                Phone: +265 XXX XXX XXX
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
