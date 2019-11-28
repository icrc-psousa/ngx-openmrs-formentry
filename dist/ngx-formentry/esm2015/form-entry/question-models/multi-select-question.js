import { SelectQuestion } from './select-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class MultiSelectQuestion extends SelectQuestion {
    constructor(options) {
        super(options);
        this.renderingType = 'multi-select' || 'single-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGNBQWM7SUFJbkQsWUFBWSxPQUFtQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsSUFBSyxlQUFlLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuL3NlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tdWx0aS1zZWxlY3Qtb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0UXVlc3Rpb24gZXh0ZW5kcyBTZWxlY3RRdWVzdGlvbiB7XG5cbiAgICBvcHRpb25zOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE11bHRpU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnbXVsdGktc2VsZWN0JyAgfHwgJ3NpbmdsZS1zZWxlY3QnO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgW107XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG5cbn1cbiJdfQ==