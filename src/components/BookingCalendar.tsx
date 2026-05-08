'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { fr, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { addDays, isBefore, isAfter, parseISO } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface BookingCalendarProps {
  blockedDates?: string[];
  onRangeSelect: (range: DateRange | undefined) => void;
  selected?: DateRange;
}

export default function BookingCalendar({ blockedDates = [], onRangeSelect, selected }: BookingCalendarProps) {
  const locale = useLocale();
  const dateLocale = locale === 'fr' ? fr : enUS;

  const blocked = blockedDates.map(d => parseISO(d));

  const isBlocked = (date: Date) => {
    return blocked.some(b =>
      b.getFullYear() === date.getFullYear() &&
      b.getMonth() === date.getMonth() &&
      b.getDate() === date.getDate()
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rdp-custom">
      <style jsx global>{`
        .rdp-custom .rdp {
          --rdp-accent-color: #0ea5e9;
          --rdp-background-color: #e0f2fe;
          margin: 0;
        }
        .rdp-custom .rdp-day_selected:not(.rdp-day_range_middle) {
          background-color: #0ea5e9;
        }
        .rdp-custom .rdp-day_range_middle {
          background-color: #e0f2fe;
          color: #0284c7;
        }
        .rdp-custom .rdp-day:hover:not(.rdp-day_disabled):not(.rdp-day_selected) {
          background-color: #f0f9ff;
        }
        .rdp-custom .rdp-caption_label {
          font-weight: 600;
          text-transform: capitalize;
        }
      `}</style>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onRangeSelect}
        locale={dateLocale}
        disabled={[
          { before: addDays(today, 1) },
          ...blocked.map(d => d),
        ]}
        modifiers={{ booked: blocked }}
        modifiersStyles={{
          booked: { backgroundColor: '#fee2e2', color: '#dc2626', textDecoration: 'line-through' }
        }}
        numberOfMonths={2}
        showOutsideDays
        fixedWeeks
      />
    </div>
  );
}
