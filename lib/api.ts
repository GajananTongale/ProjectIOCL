// Mock API functions - In production, these would make actual HTTP requests

export interface MedicalBill {
  id: string
  operatorId: string
  operatorName: string
  operatorEmail: string
  date: string
  description: string
  amount: number
  status: "pending" | "approved" | "rejected"
  category: string
  submittedDate: string
  receiptUrl?: string
  notes?: string
}

export interface User {
  id: string
  email: string
  name: string
  type: "admin" | "operator"
}

// Mock data storage
let mockBills: MedicalBill[] = [
  {
    id: "1",
    operatorId: "OP001",
    operatorName: "John Doe",
    operatorEmail: "john.doe@company.com",
    date: "2024-01-15",
    description: "General Checkup",
    amount: 150.0,
    status: "pending",
    category: "Consultation",
    submittedDate: "2024-01-16",
    notes: "Annual health checkup"
  },
  {
    id: "2",
    operatorId: "OP002",
    operatorName: "Jane Smith",
    operatorEmail: "jane.smith@company.com",
    date: "2024-01-20",
    description: "Blood Test",
    amount: 75.0,
    status: "approved",
    category: "Laboratory",
    submittedDate: "2024-01-21",
  },
  {
    id: "3",
    operatorId: "OP001",
    operatorName: "John Doe",
    operatorEmail: "john.doe@company.com",
    date: "2024-01-25",
    description: "Prescription Medication",
    amount: 45.0,
    status: "approved",
    category: "Pharmacy",
    submittedDate: "2024-01-26",
  },
  {
    id: "4",
    operatorId: "OP003",
    operatorName: "Mike Johnson",
    operatorEmail: "mike.johnson@company.com",
    date: "2024-01-28",
    description: "Dental Cleaning",
    amount: 120.0,
    status: "pending",
    category: "Dental",
    submittedDate: "2024-01-29",
  },
  {
    id: "5",
    operatorId: "OP002",
    operatorName: "Jane Smith",
    operatorEmail: "jane.smith@company.com",
    date: "2024-02-01",
    description: "Eye Examination",
    amount: 85.0,
    status: "rejected",
    category: "Vision",
    submittedDate: "2024-02-02",
  },
]

let mockUsers: User[] = [
  { id: "1", email: "admin@company.com", name: "Admin User", type: "admin" },
  { id: "OP001", email: "john.doe@company.com", name: "John Doe", type: "operator" },
  { id: "OP002", email: "jane.smith@company.com", name: "Jane Smith", type: "operator" },
  { id: "OP003", email: "mike.johnson@company.com", name: "Mike Johnson", type: "operator" },
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  // Authentication
  async login(email: string, password: string): Promise<User | null> {
    await delay(500)
    const user = mockUsers.find(u => u.email === email)
    return user || null
  },

  // Bills
  async getAllBills(): Promise<MedicalBill[]> {
    await delay(300)
    return [...mockBills]
  },

  async getBillsByOperator(operatorId: string): Promise<MedicalBill[]> {
    await delay(300)
    return mockBills.filter(bill => bill.operatorId === operatorId)
  },

  async createBill(bill: Omit<MedicalBill, 'id' | 'submittedDate'>): Promise<MedicalBill> {
    await delay(500)
    const newBill: MedicalBill = {
      ...bill,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
    }
    mockBills.push(newBill)
    return newBill
  },

  async updateBillStatus(billId: string, status: "approved" | "rejected"): Promise<MedicalBill | null> {
    await delay(300)
    const billIndex = mockBills.findIndex(bill => bill.id === billId)
    if (billIndex === -1) return null
    
    mockBills[billIndex] = { ...mockBills[billIndex], status }
    return mockBills[billIndex]
  },

  // Statistics
  async getStats(): Promise<{
    totalOperators: number
    totalAmount: number
    approvedAmount: number
    pendingCount: number
  }> {
    await delay(200)
    const uniqueOperators = new Set(mockBills.map(bill => bill.operatorId)).size
    const totalAmount = mockBills.reduce((sum, bill) => sum + bill.amount, 0)
    const approvedAmount = mockBills
      .filter(bill => bill.status === "approved")
      .reduce((sum, bill) => sum + bill.amount, 0)
    const pendingCount = mockBills.filter(bill => bill.status === "pending").length

    return {
      totalOperators: uniqueOperators,
      totalAmount,
      approvedAmount,
      pendingCount,
    }
  },

  async getOperatorStats(operatorId: string): Promise<{
    totalAmount: number
    approvedAmount: number
    pendingCount: number
    totalBills: number
  }> {
    await delay(200)
    const operatorBills = mockBills.filter(bill => bill.operatorId === operatorId)
    const totalAmount = operatorBills.reduce((sum, bill) => sum + bill.amount, 0)
    const approvedAmount = operatorBills
      .filter(bill => bill.status === "approved")
      .reduce((sum, bill) => sum + bill.amount, 0)
    const pendingCount = operatorBills.filter(bill => bill.status === "pending").length

    return {
      totalAmount,
      approvedAmount,
      pendingCount,
      totalBills: operatorBills.length,
    }
  },
}