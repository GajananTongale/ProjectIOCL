"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, Search, Users, DollarSign, Clock, CheckCircle, Eye, Loader2, RefreshCw } from "lucide-react"
import { api, type MedicalBill } from "@/lib/api"

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [bills, setBills] = useState<MedicalBill[]>([])
  const [filteredBills, setFilteredBills] = useState<MedicalBill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stats, setStats] = useState({
    totalOperators: 0,
    totalAmount: 0,
    approvedAmount: 0,
    pendingCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [updatingBills, setUpdatingBills] = useState<Set<string>>(new Set())
  const router = useRouter()

  const loadData = async () => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")
    const storedUserName = localStorage.getItem("userName")

    if (!email || userType !== "admin") {
      router.push("/admin/login")
      return
    }

    setUserEmail(email)
    setUserName(storedUserName || "")

    try {
      const [billsData, statsData] = await Promise.all([
        api.getAllBills(),
        api.getStats()
      ])
      
      setBills(billsData)
      setFilteredBills(billsData)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [router])

  useEffect(() => {
    let filtered = bills

    if (searchTerm) {
      filtered = filtered.filter(
        (bill) =>
          bill.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.operatorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadData()
  }

  const handleStatusChange = async (billId: string, newStatus: "approved" | "rejected") => {
    setUpdatingBills(prev => new Set(prev).add(billId))
    
    try {
      const updatedBill = await api.updateBillStatus(billId, newStatus)
      if (updatedBill) {
        setBills(prevBills => 
          prevBills.map(bill => bill.id === billId ? updatedBill : bill)
        )
        // Refresh stats
        const newStats = await api.getStats()
        setStats(newStats)
      }
    } catch (error) {
      console.error("Failed to update bill status:", error)
    } finally {
      setUpdatingBills(prev => {
        const newSet = new Set(prev)
        newSet.delete(billId)
        return newSet
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="hover:bg-blue-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout} className="hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Operators</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalOperators}</div>
              <p className="text-sm text-gray-500 mt-1">Active operators</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Claims</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">${stats.totalAmount.toFixed(2)}</div>
              <p className="text-sm text-gray-500 mt-1">{bills.length} total submissions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved Amount</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${stats.approvedAmount.toFixed(2)}</div>
              <p className="text-sm text-gray-500 mt-1">Ready for payout</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingCount}</div>
              <p className="text-sm text-gray-500 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl text-gray-900">Operator Medical Bills</CardTitle>
                <CardDescription className="text-base">
                  Review and manage all operator submissions
                </CardDescription>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search operators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 h-11">
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
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700">Operator</TableHead>
                    <TableHead className="font-semibold text-gray-700">Service Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Submitted</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No bills found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBills.map((bill) => (
                      <TableRow key={bill.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{bill.operatorName}</div>
                            <div className="text-sm text-gray-500">{bill.operatorEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(bill.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{bill.description}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                            {bill.category}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-gray-500">
                          {new Date(bill.submittedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {bill.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleStatusChange(bill.id, "approved")}
                                  disabled={updatingBills.has(bill.id)}
                                >
                                  {updatingBills.has(bill.id) ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Approve"
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(bill.id, "rejected")}
                                  disabled={updatingBills.has(bill.id)}
                                >
                                  {updatingBills.has(bill.id) ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Reject"
                                  )}
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="hover:bg-gray-50">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}