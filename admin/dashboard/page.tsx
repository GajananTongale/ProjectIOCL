"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, Search, Users, DollarSign, Clock, CheckCircle, Eye } from "lucide-react"

interface EmployeeBill {
  id: string
  employeeId: string
  employeeName: string
  employeeEmail: string
  date: string
  description: string
  amount: number
  status: "pending" | "approved" | "rejected"
  category: string
  submittedDate: string
}

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [bills, setBills] = useState<EmployeeBill[]>([])
  const [filteredBills, setFilteredBills] = useState<EmployeeBill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!email || userType !== "admin") {
      router.push("/admin/login")
      return
    }

    setUserEmail(email)

    // Mock data - in real app, this would come from an API
    const mockBills: EmployeeBill[] = [
      {
        id: "1",
        employeeId: "EMP001",
        employeeName: "John Doe",
        employeeEmail: "john.doe@company.com",
        date: "2024-01-15",
        description: "General Checkup",
        amount: 150.0,
        status: "pending",
        category: "Consultation",
        submittedDate: "2024-01-16",
      },
      {
        id: "2",
        employeeId: "EMP002",
        employeeName: "Jane Smith",
        employeeEmail: "jane.smith@company.com",
        date: "2024-01-20",
        description: "Blood Test",
        amount: 75.0,
        status: "approved",
        category: "Laboratory",
        submittedDate: "2024-01-21",
      },
      {
        id: "3",
        employeeId: "EMP001",
        employeeName: "John Doe",
        employeeEmail: "john.doe@company.com",
        date: "2024-01-25",
        description: "Prescription Medication",
        amount: 45.0,
        status: "approved",
        category: "Pharmacy",
        submittedDate: "2024-01-26",
      },
      {
        id: "4",
        employeeId: "EMP003",
        employeeName: "Mike Johnson",
        employeeEmail: "mike.johnson@company.com",
        date: "2024-01-28",
        description: "Dental Cleaning",
        amount: 120.0,
        status: "pending",
        category: "Dental",
        submittedDate: "2024-01-29",
      },
      {
        id: "5",
        employeeId: "EMP002",
        employeeName: "Jane Smith",
        employeeEmail: "jane.smith@company.com",
        date: "2024-02-01",
        description: "Eye Examination",
        amount: 85.0,
        status: "rejected",
        category: "Vision",
        submittedDate: "2024-02-02",
      },
    ]

    setBills(mockBills)
    setFilteredBills(mockBills)
  }, [router])

  useEffect(() => {
    let filtered = bills

    if (searchTerm) {
      filtered = filtered.filter(
        (bill) =>
          bill.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((bill) => bill.status === statusFilter)
    }

    setFilteredBills(filtered)
  }, [searchTerm, statusFilter, bills])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleStatusChange = (billId: string, newStatus: "approved" | "rejected") => {
    setBills((prevBills) => prevBills.map((bill) => (bill.id === billId ? { ...bill, status: newStatus } : bill)))
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
  const uniqueEmployees = new Set(bills.map((bill) => bill.employeeId)).size

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">{userEmail}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueEmployees}</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{bills.length} total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${approvedAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Ready for payout</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Employee Medical Bills</CardTitle>
                <CardDescription>Review and manage all employee submissions</CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Service Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bill.employeeName}</div>
                          <div className="text-sm text-gray-500">{bill.employeeEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell>{new Date(bill.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {bill.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(bill.id, "approved")}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(bill.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
