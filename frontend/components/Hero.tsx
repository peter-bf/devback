'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Hero = () => {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)
  const gearRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setRotation((prevRotation) => (prevRotation + 0.2) % 360)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (gearRef.current) {
      const rect = gearRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      setStartAngle(angle)
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && gearRef.current) {
      const rect = gearRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const newRotation = ((angle - startAngle) * 180) / Math.PI
      setRotation((prevRotation) => (prevRotation + newRotation) % 360)
      setStartAngle(angle)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative overflow-hidden w-full bg-gray-900">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-xl mb-6">Discover amazing projects and connect with developers from around the world.</p>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border border-white hover:bg-white/10 hover:text-white transition-all duration-300 relative z-0 text-lg px-6 py-3"
          >
            <Link href="/search">
              Get Started
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2 relative h-64">
          <svg
            ref={gearRef}
            className="w-96 h-96 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-grab"
            viewBox="0 0 24 24"
            style={{ 
              transform: `translateY(-50%) rotate(${rotation}deg)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <path
              fill="none"
              stroke="white"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        </div>
      </div>
      <div className="w-full h-px bg-white/10"></div>
    </div>
  )
}

export default Hero

