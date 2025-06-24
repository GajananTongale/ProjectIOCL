import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MedBills Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your medical expense management with our secure portal system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Employee Portal</CardTitle>
              <CardDescription>Upload and manage your medical bills and expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload medical bills and receipts</li>
                <li>• Track reimbursement status</li>
                <li>• View submission history</li>
                <li>• Secure document storage</li>
              </ul>
              <Link href="/employee/login" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">Employee Login</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Review and manage all employee medical expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• View all employee submissions</li>
                <li>• Process reimbursements</li>
                <li>• Generate reports</li>
                <li>• Manage employee data</li>
              </ul>
              <Link href="/admin/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Admin Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">Secure • Compliant • Easy to Use</p>
        </div>
      </div>
    </div>
  )
}
