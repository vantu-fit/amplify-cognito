"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import "@/utils/config"

export function InputOTPControlled({code, setCode} : {code: string, setCode: (code: string) => void}) { 

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={(value) => setCode(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-sm">
        {code === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {code}</>
        )}
      </div>
    </div>
  )
}
