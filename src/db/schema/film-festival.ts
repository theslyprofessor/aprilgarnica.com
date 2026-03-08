import {
  pgSchema,
  uuid,
  text,
  timestamp,
  numeric,
  boolean,
  integer,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const filmFestival = pgSchema('film_festival');

// ─── Festivals ─────────────────────────────────────────────

export const festivals = filmFestival.table('festivals', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  website: text('website'),
  location: text('location'),
  category: text('category', {
    enum: ['tier_a', 'tier_b', 'regional', 'student', 'genre', 'online'],
  }).notNull(),
  description: text('description'),
  notableAlumni: text('notable_alumni'),
  estimatedAcceptanceRate: numeric('estimated_acceptance_rate', {
    precision: 5,
    scale: 2,
  }),
  isRecurring: boolean('is_recurring').default(true),
  ownerId: uuid('owner_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Submissions ───────────────────────────────────────────

export const submissions = filmFestival.table('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  festivalId: uuid('festival_id').notNull(),
  filmTitle: text('film_title').notNull().default('Fronterizos'),
  status: text('status', {
    enum: [
      'researching',
      'planned',
      'submitted',
      'under_review',
      'accepted',
      'rejected',
      'waitlisted',
      'withdrawn',
    ],
  })
    .default('researching')
    .notNull(),
  submissionPlatform: text('submission_platform', {
    enum: ['filmfreeway', 'withoutabox', 'shortfilmdepot', 'direct', 'other'],
  }),
  submissionUrl: text('submission_url'),
  // Dates
  earlyDeadline: date('early_deadline'),
  regularDeadline: date('regular_deadline'),
  lateDeadline: date('late_deadline'),
  submittedDate: date('submitted_date'),
  notificationDate: date('notification_date'),
  festivalStartDate: date('festival_start_date'),
  festivalEndDate: date('festival_end_date'),
  // Fees
  earlyFee: numeric('early_fee', { precision: 8, scale: 2 }),
  regularFee: numeric('regular_fee', { precision: 8, scale: 2 }),
  lateFee: numeric('late_fee', { precision: 8, scale: 2 }),
  feeWaiver: boolean('fee_waiver').default(false),
  actualFeePaid: numeric('actual_fee_paid', { precision: 8, scale: 2 }),
  // Assessment
  priorityLevel: text('priority_level', {
    enum: ['must_submit', 'high', 'medium', 'low', 'maybe'],
  }).default('medium'),
  fitScore: integer('fit_score'),
  notes: text('notes'),
  // Metadata
  ownerId: uuid('owner_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Submission Events ─────────────────────────────────────

export const submissionEvents = filmFestival.table('submission_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  submissionId: uuid('submission_id').notNull(),
  eventType: text('event_type', {
    enum: [
      'status_change',
      'fee_paid',
      'materials_sent',
      'screening_scheduled',
      'award_received',
      'note_added',
    ],
  }).notNull(),
  eventDate: timestamp('event_date', { withTimezone: true }).defaultNow(),
  details: text('details'),
  previousStatus: text('previous_status'),
  newStatus: text('new_status'),
  ownerId: uuid('owner_id').notNull(),
});

// ─── Relations ─────────────────────────────────────────────

export const festivalsRelations = relations(festivals, ({ many }) => ({
  submissions: many(submissions),
}));

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  festival: one(festivals, {
    fields: [submissions.festivalId],
    references: [festivals.id],
  }),
  events: many(submissionEvents),
}));

export const submissionEventsRelations = relations(
  submissionEvents,
  ({ one }) => ({
    submission: one(submissions, {
      fields: [submissionEvents.submissionId],
      references: [submissions.id],
    }),
  }),
);
