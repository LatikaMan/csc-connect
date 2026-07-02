'use client'
import { useState } from 'react'
import { Search, CheckCircle, Clock, AlertCircle, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const statusSteps = [
  { key: 'SUBMITTED', label: 'Submitted', icon: Package },
  { key: 'UNDER_REVIEW', label: 'Under Review', icon: Search },
  { key: 'PROCESSING', label: 'Processing', icon: Clock },
  { key: 'APPROVED', label: 'Approved', icon: CheckCircle },
  { key: 'COMPLETED', label: 'Completed', icon: CheckCircle },
]

export default function StatusPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`/api/applications/status?q=${query}`)
      setResult(res.data.application)
    } catch {
      setError('No application found with this ID or mobile number.')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const currentStep = statusSteps.findIndex(s => s.key === result?.status)

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Track Your Application
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Enter your Application ID or Mobile Number to check status
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="flex gap-3 mb-6">
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Application ID or Mobile Number"
              className="h-12"
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading} className="h-12 px-6">
              {loading ? 'Searching...' : 'Track'}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          {result && (
            <div>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-900">Application No: {result.applicationNo}</p>
                <p className="text-sm text-gray-600">Service: {result.appointment?.service?.name}</p>
              </div>

              <div className="relative">
                {statusSteps.map((step, idx) => {
                  const isCompleted = idx <= currentStep
                  const isCurrent = idx === currentStep
                  const Icon = step.icon
                  return (
                    <div key={step.key} className="flex items-center gap-4 mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                        {isCurrent && <p className="text-xs text-gray-500">Current status</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}