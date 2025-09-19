# Developer Technical Interview

Welcome!

Thanks for taking the time to work through this technical challenge with us. We're excited to see how you approach problem-solving and get a sense of how you work with existing codebases.

## What We're Looking For

We value **conversation and collaboration** over perfect solutions. Feel free to:
- Ask questions about anything that's unclear
- Share your thoughts on the codebase as you explore it
- Suggest improvements you'd make to code you encounter
- Talk through your debugging process out loud

We learn just as much from how you think through problems as we do from the final result!

## Ground Rules

- **Please disable AI autocomplete tools** (GitHub Copilot, etc.) for this session
- **Everything else is fair game** documentation, Stack Overflow, browser-based AI tools, whatever you normally use
- The codebase is intentionally messy and lacks comments. There are likely bugs and issues in the code beside the ones we are asking you to find. That's realistic! We don't always get to work in perfect codebases. 

## The Application

This is a Vue 3 application for editing framework data. It is very loosely based on the idea of Satchel, the product this position will be working in. You can add items, edit their properties, and manage extensions on those items. Feel free to click around and get familiar with how it works.

## Your Mission

We have two tickets that need attention. Don't worry if you don't get through both, we have time built in at the end to discuss your approach and findings.

---

### **Ticket #1: Extension Data Loss Bug**

**Issue:**
There's a bug in the item editing functionality. When you select an item and edit its extensions, everything works fine. However, when you edit the `note` field specifically, all other extension data gets dropped.

**Acceptance Criteria:**
- Editing the note field should preserve all other extension data
- When editing the note field, it should not be sanitized.
- Other extension fields should continue working as they do now.
- No regressions in existing functionality

---

### **Ticket #2: Modernize UpdateDataPage Component**

**Issue:**
Our app recently migrated from Vue 2 to Vue 3, but we have one remaining Options API component that needs updating.

**Acceptance Criteria:**
- Convert `UpdateDataPage.vue` from Options API to Composition API
- Extract the navigation bar code into a separate `AppNavBar.vue` component
- Maintain all existing functionality
- Follow Vue 3 best practices

---

## Getting Started

The app should be ready to run, just get it started and dive in! If you run into any setup issues, let us know.

## Questions?

Seriously, ask away! We're here to help and we'd rather clarify things upfront than have you spend time going down the wrong path.

Good luck and have fun!