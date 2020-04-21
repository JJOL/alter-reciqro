class IndicatorInstance<T> {
    inst: T;
}

interface DualIndicatorProvider {
    /**
     * Returns the name of the class of instances in the system population.
     * @returns string
     */
    getClassName(): string;

    /**
     * Returns public name of the metric.
     * @returns string
     */
    getMetricName(): string;

    
    /**
     * Returns a list of all instances of the class population.
     */
    getAvailableInstances();

    
    /**
     * Returns Frecuency Point Data for a given instance in within a time interval.
     * @param  {Date} lowerExclusiveDate
     * @param  {Date} upperExclusiveDate
     * @param  {any} instance
     */
    calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: any);
    
    /**
     * Returns accumulated frecuency data for each instance.
     */
    getOverallMetrics();
}