# OmmNoMi Standard — Commercial & Quotation Process
> OmmNoMi Automation LLP | Commercial Strategy & Quoting SOP

---

## 1. Pricing Strategy
- **Standard Hourly Rate:** OmmNoMi charges **$25 per hour** for all AppSheet and automation development work.
- **Reuse-First Architecture:** Always look for ways to extend existing tables, bots, or schemas (e.g., extending `DocType` and `Documents` instead of building a new Compliance engine from scratch). If significant reuse is possible, **reduce the estimated hours** to reflect the actual effort required. Do not blindly accept inflated SOW estimates.

## 2. Partner & Middleman Engagements
When building projects where an intermediary (e.g., IKAROS) is the sponsor and another company (e.g., BLR World) is the end-client:
- **Protect the Partner's Margin:** Adjust the total quoted hours and pricing to allow the partner to keep their margin/commission, based on the fixed price they agreed upon with the client.
- **Client-Facing Discretion:** **Never** mention the partner's commission, markup, or margin in any technical response, quotation, or document that will be shared with the end-client.

## 3. Advance Payment & Refund Policy
- **Standard Terms:** Projects typically require a 50% advance payment before Phase A begins.
- **Refund Policy (Crucial):** If a phase is rejected and a refund is triggered, a 100% refund of the advance is **not possible**. Refunds must be issued **excluding any applicable GST and Transaction charges**. These fees are non-recoverable and must be explicitly stated in the Technical Response / Quotation assumptions.

## 4. Quotation Generation in Frappe (OmmNoMi_FAC)
All quotations are generated using the `OmmNoMi_FAC` Frappe/ERPNext system via MCP.

### Formatting the Custom Scope of Work
The `custom_scope_of_work` field in Frappe is a rich-text HTML field that renders directly on the commercial print format (PDF) sent to the client. The layout must be perfectly clean and professional.

**Strict Formatting Rules for `custom_scope_of_work` HTML:**
1. **Wrapper:** Wrap the entire content in `<div class="ql-editor read-mode"> ... </div>`.
2. **Headings:** Use `<h3>` for primary sections and `<h4>` or `<p><strong>` for sub-sections. **Do not use `<h2>` or `<h1>`** as they render excessively large in the print format.
3. **Delivery Plans & Tabular Data:** Never use long, spaced-out bulleted lists (`<ul>`) for delivery plans, phases, or registers. **Always use standard HTML tables** with Bootstrap-like styling.
4. **Table Styling:** Apply the following inline styling to all tables to ensure they look like professional commercial grids:
   ```html
   <table class="table table-bordered" style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 13px;">
     <thead>
       <tr>
         <th style="padding: 4px 8px; border: 1px solid #d1d8dd; background-color: #f8f9fa;">Column Name</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td style="padding: 4px 8px; border: 1px solid #d1d8dd;">Data</td>
       </tr>
     </tbody>
   </table>
   ```
5. **Spacing:** Remove excessive margins on lists. Use `<ul style="margin-top: 0; margin-bottom: 10px;">` to keep bullet points tight.

## 5. Technical Response Integration
When a client or partner provides a Technical Scope of Work (SOW) markdown file:
1. Parse the document to calculate the real hours required.
2. Draft a response that explicitly accepts the scope, corrects the architecture (if "Reuse-First" applies), sets the $25/hr timeline, and enforces the GST refund clause.
3. Inject the FULL detail of this response (Bot registers, schema updates, UAT criteria, Out of Scope items) directly into the Frappe Quotation using the HTML table styling method above. Do not send the Markdown file separately if it can be unified into the Quotation.

## 6. OmmNoMi Proposal Tone & Structure (The "10/10 Contract")
When drafting Technical Responses or Proposals, adopt the specific "OmmNoMi Voice" and structural framework defined here. This creates an authoritative, clear, and highly professional contract.

### Tone & Voice
- **Authoritative & Direct**: Do not use flowery sales language. Use clear, declarative sentences ("We have reviewed...", "We formally accept...").
- **Engineering-Led Confidence**: Frame changes not as "we think it's better" but as "Net architectural improvement." Lean heavily on logic, efficiency, and reuse.
- **Explicit Clarity**: Leave zero ambiguity. Use tables instead of paragraphs whenever comparing states, defining phases, listing assumptions, or describing the data schema.

### Required Structural Elements
A complete OmmNoMi Technical Response must include the following sections in order:

1. **Document Meta-Table**: A header table stating who prepared it, for whom, in response to what, the date, and the confidentiality classification.
2. **Scope Acceptance**: Explicitly state that the SOW was reviewed in full. Clearly accept the scope. State the revised pricing ($25/hr) and hours due to reuse. Define the trigger to start work (e.g., "upon receipt of the 50% advance invoice").
3. **Technical Approach (Reuse-First)**: Explain the "Additive Module Strategy". Compare the client's initial architecture assumptions with the OmmNoMi Build in a "Net architectural improvement" table (showing reductions in new tables/tabs).
4. **Full Delivery Plan**: A tabular breakdown of Phase A (Core/Priority) and Phase B (Extended), detailing Activity, What We Build, and Hours.
5. **Delivery Timeline**: A clean table showing Build effort, Review window, and Elapsed time per phase, plus contingency buffers. Include indicative start/delivery dates.
6. **Clarifications and Assumptions Carried Forward**: A numbered table mapping Assumptions to the OmmNoMi Status. This is where the non-refundable GST/Transaction fee clause is legally anchored.
7. **New Table & Existing Table Extension Register**: Tables listing exact Google Sheet tabs to be added and existing tables to be extended (proving the additive strategy).
8. **Bot & Automation Register**: A table mapping each bot to its trigger and explicitly noting if its architecture was revised from the SOW.
9. **User Roles and Access**: A table mapping the client's personas to specific AppSheet access levels.
10. **Document Generation / Integration Readiness**: Explicitly list what templates are required from the client and when.
11. **UAT Acceptance Readiness**: A table mapping the client's success criteria to the specific Phase/Feature that delivers it.
12. **Out of Scope — Confirmed**: Explicitly confirm the exclusions from the SOW (e.g., custom CSS, historical data migration) to protect against scope creep.
13. **Next Steps**: An actionable table listing the next steps, the owner, and the target date (e.g., Countersignature, Advance Invoice, Build start).
14. **Supporting Technical Documentation**: A list of the markdown files generated in `_AppDoc` where the literal schema, logic, and view structures are captured.
