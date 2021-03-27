import React from "react";

export function useDebouncer(fn, delay = 0) {
  // Creating a ref to keep track of latest things
  const ref = React.useRef({ id: 0 });

  // Always use the latest funcion that is passed
  ref.current.fn = fn;

  // Create the debounced function
  const bouncer = React.useCallback(
    // Proxy all arguments to our debounced function
    (...args) => {
      // Create a new promise
      ref.current.promise = new Promise((resolve, reject) => {
        // Keep track of resolve and reject
        ref.current.resolve = resolve;
        ref.current.reject = reject;
      });

      // Clear the old timeout if one exists!
      if (ref.current.timeout) {
        clearTimeout(ref.current.timeout);
      }

      ref.current.timeout = setTimeout(async () => {
        ref.current.timeout = undefined;
        // Get a new ID for this async request
        const id = ref.current.id + 1;

        // Update the hook with the latest request ID
        ref.current.id = id;

        // Make a checkLatest function
        const checkLatest = () => id === ref.current.id;

        try {
          // Run the debounced function
          const response = await ref.current.fn(...args);
          // If the request is latest, resolve
          if (checkLatest()) ref.current.resolve(response);
        } catch (err) {
          // If the request is latest, reject
          if (checkLatest()) ref.current.reject(err);
        }
      }, delay);

      // Always return the promise!
      return ref.current.promise;
    },
    [delay]
  );

  return bouncer;
}
