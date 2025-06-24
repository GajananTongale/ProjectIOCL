import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, CheckCircle, Clock, DollarSign, FileText, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MedBills Portal
            </span>
          </div>
          <div className="flex space-x-4">
            <Link href="/operator/login">
              <Button variant="outline" className="hover:bg-green-50">
                Operator Login
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Streamline Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Medical Expense Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive portal system designed to simplify medical bill submissions, 
            approvals, and reimbursements for healthcare operators and administrators.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">Quick bill submissions and rapid approval workflows</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
            <p className="text-gray-600">Bank-level security with healthcare compliance standards</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Digital Records</h3>
            <p className="text-gray-600">Paperless system with automated record keeping</p>
          </div>
        </div>

        {/* Main Portal Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Operator Portal</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Submit and manage your medical bills and expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Upload Bills</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Track Status</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">View History</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Digital Storage</span>
                </div>
              </div>
              <Link href="/operator/login" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6">
                  Access Operator Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Admin Portal</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Review and manage all operator medical expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Review Bills</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Process Payments</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Manage Users</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Generate Reports</span>
                </div>
              </div>
              <Link href="/admin/login" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6">
                  Access Admin Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Trusted by Healthcare Professionals</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">256-bit</div>
              <div className="text-gray-600">Encryption</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-indigo-600 mb-2">HIPAA</div>
              <div className="text-gray-600">Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 MedBills Portal. Secure • Compliant • Easy to Use</p>
        </div>
      </footer>
    </div>
  )
}