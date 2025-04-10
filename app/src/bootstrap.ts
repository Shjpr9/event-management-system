type BootstrapFunction = () => Promise<void> | void;

export async function bootstrap(
    initFunctions: BootstrapFunction[] = []
): Promise<void> {
    try {
        for (const initFn of initFunctions) {
            await Promise.resolve(initFn());
        }

        console.log('Application bootstrap completed successfully');
    } catch (error) {
        console.error('Failed to bootstrap application:', error);
        throw error;
    }
}
