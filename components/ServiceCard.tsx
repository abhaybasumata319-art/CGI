'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { GovernmentService } from '@/types/service';

function getShortServiceName(service: GovernmentService) {
  const name = service.name.toLowerCase();

  if (name.includes('income')) {
    return 'Income Certificate';
  }

  if (name.includes('birth')) {
    return 'Birth Certificate';
  }

  if (name.includes('pan')) {
    return 'PAN Card';
  }

  if (
    name.includes('voter') ||
    name.includes('electoral')
  ) {
    return 'Voter Services';
  }

  if (
    name.includes('grievance') ||
    name.includes('cpgrams')
  ) {
    return 'Grievance';
  }

  if (
    name.includes('e-sevai') ||
    name.includes('esevai') ||
    name.includes('citizen services')
  ) {
    return 'TN e-Sevai';
  }

  if (
    name.includes('application') ||
    name.includes('status')
  ) {
    return 'Application Status';
  }

  if (name.includes('community')) {
    return 'Community Certificate';
  }

  if (name.includes('passport')) {
    return 'Passport';
  }

  // Safe fallback for any service we haven't explicitly mapped.
  return service.name;
}

export function ServiceCard({
  service,
}: {
  service: GovernmentService;
}) {
  const visualRef = useRef<HTMLDivElement>(null);

  const shortName = getShortServiceName(service);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const visual = visualRef.current;

    if (!visual) return;

    const rect = visual.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 2 - 1;
    const percentY = (y / rect.height) * 2 - 1;

    /*
     * Very subtle mouse-following tilt.
     * Mouse top-right -> leans top-right.
     * Mouse bottom-left -> leans bottom-left.
     */
    const rotateY = percentX * 2.8;
    const rotateX = percentY * -2.8;

    visual.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.025)
    `;
  };

  const handleMouseLeave = () => {
    const visual = visualRef.current;

    if (!visual) return;

    visual.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-card"
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      }}
    >
      {/* =========================
          SERVICE VISUAL
         ========================= */}

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          perspective: '1000px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={visualRef}
          style={{
            position: 'relative',

            width: '94%',
            minHeight: '215px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: '24px',
            overflow: 'hidden',

            background: '#f3f5f2',

            boxShadow:
              '0 12px 30px rgba(20, 30, 35, 0.08)',

            transform:
              'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',

            transition:
              'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease',

            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {service.image ? (
            <Image
              src={service.image}
              alt={`${service.name} service`}
              fill
              sizes="
                (max-width: 700px) 90vw,
                (max-width: 1100px) 30vw,
                430px
              "
              style={{
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              className="image-fallback"
              aria-label={`${service.category} service illustration`}
              style={{
                width: '100%',
                height: '215px',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span aria-hidden="true">✦</span>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          MINIMAL APPLE-STYLE PILL
         ========================= */}

      <div
        style={{
          width: '78%',
          maxWidth: '370px',

          height: '48px',

          /*
           * Small but visible separation
           * between image and pill.
           */
          margin: '9px auto 0',

          padding: '0 18px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          /*
           * This is important.
           * Prevents the text from crashing
           * into the action.
           */
          gap: '16px',

          borderRadius: '999px',

          background:
            'rgba(255, 255, 255, 0.88)',

          border:
            '1px solid rgba(20, 35, 35, 0.065)',

          boxShadow:
            '0 5px 18px rgba(20, 30, 35, 0.055)',

          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',

          boxSizing: 'border-box',

          overflow: 'hidden',
        }}
      >
        {/* =========================
            LEFT — SERVICE NAME
           ========================= */}

        <span
          style={{
            minWidth: 0,

            flex: '1 1 auto',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',

            fontSize: '13px',
            fontWeight: 500,

            letterSpacing: '-0.01em',

            color: '#252b2c',

            lineHeight: 1,
          }}
        >
          {shortName}
        </span>

        {/* =========================
            RIGHT — ACTION
           ========================= */}

        <span
          style={{
            flex: '0 0 auto',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',

            gap: '5px',

            fontSize: '10px',
            fontWeight: 600,

            letterSpacing: '0.055em',

            color: '#3d756d',

            whiteSpace: 'nowrap',

            lineHeight: 1,
          }}
        >
          {service.status === 'verified'
            ? 'Verified'
            : 'Demo guide'}

          <span
            aria-hidden="true"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1,
              transform: 'translateY(-1px)',
            }}
          >
            ↗
          </span>
        </span>
      </div>
    </Link>
  );
}