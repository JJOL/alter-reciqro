export interface IndicatorInstance {
    name: string;
}

export interface DualIndicatorProvider {
    
    
    /**
     * Loads metadata from storage and call callback parameter function when it has loaded.
     * @param  {()=>void} onMetadaLoadedCb
     */
    loadMetaData(onMetadaLoadedCb: () => void);

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
     * @returns Promise<number[]>
     */
    calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: any): Promise<number[]>;
    
    /**
     * Returns accumulated frecuency data for each instance.
     */
    getOverallMetrics();
}