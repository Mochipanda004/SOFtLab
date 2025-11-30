'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { HeroContent } from '@/mocks/home-data'

interface Props {
  data: HeroContent
  onCTAClick?: () => void
  ctaHref?: string
}

export default function HeroSection({ data, onCTAClick, ctaHref }: Props) {
  return (
    <section
      className="relative overflow-hidden px-6 py-20 text-center"
      style={{
        background:
          'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #f5d0fe 60%, #fef3c7 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          {data.title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          {data.subtitle}
        </p>
        {ctaHref ? (
          <Link href={ctaHref} aria-label={data.ctaText}>
            <Button className="mt-8">
              {data.ctaText}
            </Button>
          </Link>
        ) : (
          <Button className="mt-8" onClick={onCTAClick} aria-label={data.ctaText}>
            {data.ctaText}
          </Button>
        )}
      </div>
    </section>
  )
}
