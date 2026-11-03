import { ArrowUpRight, LoaderCircle, RotateCcw } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  ENQUIRY_DELIVERY_LIVE,
  ENQUIRY_ROLES,
  ENQUIRY_TOPICS,
  enquirySchema,
  submitEnquiry,
  type Enquiry,
} from "@/lib/enquiry";
import { CONTACT, properties } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof Enquiry, string>>;
type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; reference: string; firstName: string }
  | { kind: "failed" };

export function EnquiryForm({
  defaultProperty,
  defaultTopic,
}: {
  defaultProperty?: string | undefined;
  defaultTopic?: string | undefined;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const [role, setRole] = useState("");
  const propertyName = properties.find((p) => p.slug === defaultProperty)?.name ?? "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
    const parsed = enquirySchema.safeParse({ ...raw, role });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Enquiry;
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setState({ kind: "sending" });
    try {
      const result = await submitEnquiry({ data: parsed.data });
      setState({ kind: "sent", reference: result.reference, firstName: parsed.data.firstName });
    } catch {
      setState({ kind: "failed" });
    }
  };

  if (state.kind === "sent") {
    return (
      <div className="enquiry-sent" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" className="enquiry-check" aria-hidden="true">
          <circle cx="32" cy="32" r="30" />
          <path d="M20 33 l8 8 l16 -18" />
        </svg>
        <h3 className="mt-8 font-display text-4xl md:text-5xl">Thank you, {state.firstName}.</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Your message is with the team. We reply to every enquiry, usually within one business day.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Reference{" "}
          <span className="font-medium tabular-nums text-foreground">{state.reference}</span>
        </p>
        {!ENQUIRY_DELIVERY_LIVE && (
          <p className="mt-6 max-w-md rounded-sm border border-dashed px-4 py-3 text-sm text-muted-foreground">
            Preview: online enquiries aren't connected yet, so this message wasn't sent. Please
            email{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-fern underline">
              {CONTACT.email}
            </a>
            .
          </p>
        )}
        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="action action-outline mt-10"
        >
          <span className="action-label">Send another message</span>
          <span className="action-icon" aria-hidden="true">
            <RotateCcw size={15} />
          </span>
        </button>
      </div>
    );
  }

  const sending = state.kind === "sending";
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "grid gap-x-6 gap-y-8 sm:grid-cols-2",
        sending && "pointer-events-none opacity-70",
      )}
      aria-busy={sending}
    >
      <Field
        label="First name"
        name="firstName"
        autoComplete="given-name"
        required
        error={errors.firstName}
      />
      <Field label="Last name" name="lastName" autoComplete="family-name" error={errors.lastName} />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      <Select
        label="Choose a topic"
        name="topic"
        required
        error={errors.topic}
        defaultValue={
          defaultTopic && (ENQUIRY_TOPICS as readonly string[]).includes(defaultTopic)
            ? defaultTopic
            : propertyName
              ? "Leasing and space"
              : ""
        }
      >
        <option value="" disabled>
          Select one…
        </option>
        {ENQUIRY_TOPICS.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </Select>
      <Select label="Property (optional)" name="property" defaultValue={propertyName}>
        <option value="">Not about a specific property</option>
        {properties.map((p) => (
          <option key={p.slug}>{p.name}</option>
        ))}
      </Select>
      <fieldset className="sm:col-span-2">
        <legend className="field-label">Which best describes you?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENQUIRY_ROLES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => setRole(role === r ? "" : r)}
              className={cn("tab-chip bg-background", role === r && "is-active")}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <Field
        label="Message"
        name="message"
        multiline
        required
        error={errors.message}
        className="sm:col-span-2"
        placeholder="Tell us what you need…"
      />
      {/* Honeypot, hidden from people and assistive tech. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-muted-foreground">
          {state.kind === "failed" ? (
            <span className="text-destructive">
              Something went wrong sending that. Please try again, or email{" "}
              <a href={`mailto:${CONTACT.email}`} className="underline">
                {CONTACT.email}
              </a>
              .
            </span>
          ) : (
            "We only use your details to reply to this enquiry."
          )}
        </p>
        <button type="submit" className="action action-solid" disabled={sending}>
          <span className="action-label">{sending ? "Sending…" : "Send message"}</span>
          <span className="action-icon" aria-hidden="true">
            {sending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

function FieldShell({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className={cn("field", error && "has-error", className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-fern"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  multiline,
  className,
  ...props
}: {
  label: string;
  error?: string | undefined;
  multiline?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const shared = {
    id,
    "aria-invalid": !!error || undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: "field-input",
  };
  return (
    <FieldShell id={id} label={label} required={props.required} error={error} className={className}>
      {multiline ? (
        <textarea
          rows={5}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...shared}
        />
      ) : (
        <input {...(props as React.InputHTMLAttributes<HTMLInputElement>)} {...shared} />
      )}
    </FieldShell>
  );
}

function Select({
  label,
  error,
  children,
  ...props
}: {
  label: string;
  error?: string | undefined;
  children: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={props.required} error={error}>
      <select
        id={id}
        className="field-input"
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
