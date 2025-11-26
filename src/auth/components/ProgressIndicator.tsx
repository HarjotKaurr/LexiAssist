interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, totalSteps, steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="hidden sm:flex justify-between mt-4 gap-2">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex-1 text-center text-xs ${
              index + 1 === currentStep 
                ? 'text-primary font-semibold' 
                : index + 1 < currentStep 
                ? 'text-foreground/60' 
                : 'text-muted-foreground'
            }`}
          >
            <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
              index + 1 === currentStep 
                ? 'bg-primary text-white' 
                : index + 1 < currentStep 
                ? 'bg-primary/30 text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1 < currentStep ? '✓' : index + 1}
            </div>
            <span className="hidden md:inline">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
