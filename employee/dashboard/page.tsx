"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOut, Plus, DollarSign, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface MedicalBill {
  id: string
  date: string
  description: string
  amount: number
  status: "pending" | "approved" | "rejected"
  category: string
}

export default function EmployeeDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [bills, setBills] = useState<MedicalBill[]>([])
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!email || userType !== "employee") {
      router.push("/employee/login")
      return
    }

    setUserEmail(email)

    // Mock data - in real app, this would come from an API
    setBills([
      {
        id: "1",
        date: "2024-01-15",
        description: "General Checkup",
        amount: 150.0,
        status: "approved",
        category: "Consultation",
      },
      {
        id: "2",
        date: "2024-01-20",
        description: "Blood Test",
        amount: 75.0,
        status: "pending",
        category: "Laboratory",
      },
      {
        id: "3",
        date: "2024-01-25",
        description: "Prescription Medication",
        amount: 45.0,
        status: "approved",
        category: "Pharmacy",
      },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const approvedAmount = bills.filter((bill) => bill.status === "approved").reduce((sum, bill) => sum + bill.amount, 0)
  const pendingCount = bills.filter((bill) => bill.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-600">{userEmail}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submitted</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{bills.length} bills submitted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${approvedAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Ready for reimbursement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Bills awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Medical Bills</h2>
          <Link href="/employee/upload">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Bill
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.description}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>${bill.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(bill.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
