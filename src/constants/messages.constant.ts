const MESSAGE = {
    SUCCESS: {
        
    },

    ERROR: {
        UNEXPECTED: 'Unexpected error.',
        UNAUTHORIZED: 'Unauthorized access.',
        SERVER_ERROR: 'Internal server error.',
        SERVICE_ERROR: 'Service temporarily unavailable.'
    }
} as const;

const BUILDERS = {
    NOT_FOUND: (entity: string) => `${entity} not found.`,
    CREATED: (entity: string) => `${entity} created successfully.`,
    UPDATED: (entity: string) => `${entity} updated successfully.`,
    DELETED: (entity: string) => `${entity} deleted successfully.`,
    EXISTS: (entity: string) => `${entity} already exists.`,
    INVALID: (entity: string) => `Invalid ${entity}.`
} as const;

export { MESSAGE, BUILDERS };