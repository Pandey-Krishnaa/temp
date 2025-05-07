// db/schema.ts
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  blob,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const batch = sqliteTable("batches", {
  id: text("_id").primaryKey(),
  assessor: text("assessor").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  noOfCandidates: integer("noOfCandidates").notNull(),
  durationInMin: integer("durationInMin").notNull(),
  no: text("no").notNull(),
  startDate: text("startDate").notNull(), // ISO format
  endDate: text("endDate").notNull(),
  theoryQuestionBank: text("theoryQuestionBank").notNull(),
  practicalQuestionBank: text("practicalQuestionBank").notNull(),
  vivaQuestionBank: text("vivaQuestionBank").notNull(),
  isAssessorReached: integer("isAssessorReached", {
    mode: "boolean",
  }).notNull(),
  isCandidateVideoRequired: integer("isCandidateVideoRequired", {
    mode: "boolean",
  }).notNull(),
  isCandidatePhotosRequired: integer("isCandidatePhotosRequired", {
    mode: "boolean",
  }).notNull(),
  isCandidateLocationRequired: integer("isCandidateLocationRequired", {
    mode: "boolean",
  }).notNull(),
  isCandidateAdharRequired: integer("isCandidateAdharRequired", {
    mode: "boolean",
  }).notNull(),
  isCandidateSelfieRequired: integer("isCandidateSelfieRequired", {
    mode: "boolean",
  }).notNull(),
  isPracticalVisibleToCandidate: integer("isPracticalVisibleToCandidate", {
    mode: "boolean",
  }).notNull(),
  isSuspiciousActivityDetectionRequired: integer(
    "isSuspiciousActivityDetectionRequired",
    { mode: "boolean" }
  ).notNull(),
  isAssessorEvidenceRequired: integer("isAssessorEvidenceRequired", {
    mode: "boolean",
  }).notNull(),
  assessorReachedAt: text("assessorReachedAt"),
  assessorCoordinates: text("assessorCoordinates"),
  assessorGroupPhoto: text("assessorGroupPhoto"),
});

export const candidate = sqliteTable("candidates", {
  id: text("_id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  batchId: text("batchId").notNull(),
  fatherName: text("fatherName"),
  enrollmentNo: text("enrollmentNo").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).notNull(),
  password: text("password").notNull(),
  gender: text("gender"),
  adharNo: text("adharNo"),
  isTheoryStarted: integer("isTheoryStarted", { mode: "boolean" }).notNull(),
  isEvidanceUploaded: integer("isEvidanceUploaded", {
    mode: "boolean",
  }).notNull(),
  isPresentInTheory: integer("isPresentInTheory", {
    mode: "boolean",
  }).notNull(),
  isPresentInPractical: integer("isPresentInPractical", {
    mode: "boolean",
  }).notNull(),
  isPresentInViva: integer("isPresentInViva", { mode: "boolean" }).notNull(),
  isTheorySubmitted: integer("isTheorySubmitted", {
    mode: "boolean",
  }).notNull(),
  theoryExamStatus: text("theoryExamStatus").notNull(),
  practicalExamStatus: text("practicalExamStatus").notNull(),
  vivaExamStatus: text("vivaExamStatus").notNull(),
  multipleFaceDetectionCount: integer("multipleFaceDetectionCount").notNull(),
  faceHiddenCount: integer("faceHiddenCount").notNull(),
  tabSwitchCount: integer("tabSwitchCount").notNull(),
  exitFullScreenCount: integer("exitFullScreenCount").notNull(),
  theoryStartedAt: text("theoryStartedAt"),
  theorySubmittedAt: text("theorySubmittedAt"),
  candidateSelfieCoordinates: text("candidateSelfieCoordinates"),
  candidateSelfieTakenAt: text("candidateSelfieTakenAt"),
  candidateSelfie: text("candidateSelfie"),
  adharPicture: text("adharPicture"),
  resetedAt: text("resetedAt"),
  practicalStartedAt: text("practicalStartedAt"),
  practicalSubmittedAt: text("practicalSubmittedAt"),
});

export const examResponse = sqliteTable(
  "exam_response",
  {
    questionId: text("questionId").notNull(),
    candidateId: text("candidateId").notNull(),
    batchId: text("batchId").notNull(),
    answerId: text("answerId").notNull(),
    startedAt: text("startedAt").notNull(),
    endedAt: text("endedAt").notNull(),
    type: text("type").notNull().default("THEORY"),
    marksObtained: integer("marksObtained").notNull().default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.questionId, table.candidateId] }),
  })
);
export const batchesRelations = relations(batch, ({ one, many }) => ({
  candidates: many(candidate), // One batch can have many candidates
  examResponses: many(examResponse), // One batch can have many exam responses
}));

export const candidatesRelations = relations(candidate, ({ one, many }) => ({
  batch: one(batch), // One candidate belongs to one batch
  examResponses: many(examResponse), // One candidate can have many exam responses
}));

export const examResponsesRelations = relations(examResponse, ({ one }) => ({
  candidate: one(candidate), // One exam response is related to one candidate
  batch: one(batch), // One exam response is related to one batch
}));
