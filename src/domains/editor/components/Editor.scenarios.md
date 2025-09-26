# Test Scenarios for Tablet Weaving Editor

## Editor Component Test Scenarios

### Scenario 1: Initial State Verification

**Description**: Verify the Editor component renders correctly with default values
**Steps**:

1. Render the Editor component
2. Verify ControlPanel is present
3. Verify TabletsPanel is present
4. Verify ThreadsPanel is present
5. Check default values: holes=4, tablets=4, picks=8

**Expected Results**:

- All panels render without errors
- Default draft state matches expected values
- useDraft hook provides correct initial state

### Scenario 2: Control Panel Input Interactions

**Description**: Test all input controls in the ControlPanel
**Steps**:

1. Open ControlPanel
2. Test Holes input (range 3-8):
   - Click increment button multiple times
   - Click decrement button multiple times
   - Verify buttons disable at min/max values
3. Test Tablets input (range 2-30):
   - Click increment button multiple times
   - Click decrement button multiple times
   - Verify buttons disable at min/max values
4. Test Picks input (range 1-99):
   - Click increment button multiple times
   - Click decrement button multiple times
   - Verify buttons disable at min/max values

**Expected Results**:

- All inputs respond immediately without blocking
- Values update correctly in the UI
- Buttons disable appropriately at boundaries
- No infinite re-renders or crashes

### Scenario 3: Rapid Input Changes

**Description**: Test rapid clicking on input controls to ensure no blocking
**Steps**:

1. Rapidly click Holes increment button 10 times
2. Rapidly click Tablets increment button 10 times
3. Rapidly click Picks increment button 10 times
4. Mix rapid clicks between different inputs
5. Test rapid decrement clicks

**Expected Results**:

- Application remains responsive
- All clicks are processed correctly
- No crashes or freezing
- UI updates smoothly

### Scenario 4: Panel Synchronization

**Description**: Verify that input changes affect the corresponding panels
**Steps**:

1. Change Holes value and verify TabletsPanel rows update
2. Change Tablets value and verify TabletsPanel columns update
3. Change Picks value and verify ThreadsPanel rows update
4. Test boundary values (min/max) for each input

**Expected Results**:

- TabletsPanel rows match holes value
- TabletsPanel columns match tablets value
- ThreadsPanel rows match picks value
- Panels update immediately when inputs change

## ControlPanel Component Test Scenarios

### Scenario 5: ControlPanel Rendering

**Description**: Test ControlPanel component rendering and structure
**Steps**:

1. Render ControlPanel component
2. Verify drawer structure is correct
3. Check InputsPanel is present
4. Check ColorsPanel is present
5. Check FilePanel is present

**Expected Results**:

- Drawer opens and closes correctly
- All sub-panels render without errors
- Proper styling and layout

### Scenario 6: InputsPanel Functionality

**Description**: Test InputsPanel component specifically
**Steps**:

1. Render InputsPanel in isolation
2. Test NumberInput components
3. Verify onChange handlers work
4. Test min/max validation
5. Test button disabled states

**Expected Results**:

- NumberInput components work correctly
- onChange handlers are called with correct values
- Min/max validation prevents invalid values
- Buttons disable at boundaries

## useDraft Hook Test Scenarios

### Scenario 7: Draft State Management

**Description**: Test useDraft hook state management
**Steps**:

1. Test initial draft state
2. Test updateHoles function
3. Test updateTablets function
4. Test updatePicks function
5. Test state consistency after updates

**Expected Results**:

- Initial state matches expected values
- State updates correctly for each function
- No stale closures or infinite loops
- State remains consistent across updates

### Scenario 8: Draft Context Provider

**Description**: Test DraftContextProvider functionality
**Steps**:

1. Test context provides all required functions
2. Test state updates trigger re-renders
3. Test multiple rapid updates
4. Test error handling

**Expected Results**:

- Context provides all expected functions
- State updates trigger appropriate re-renders
- Rapid updates don't cause issues
- Error states are handled gracefully

## Integration Test Scenarios

### Scenario 9: End-to-End Input Flow

**Description**: Test complete flow from input to panel updates
**Steps**:

1. Start with default state
2. Change Holes from 4 to 6
3. Change Tablets from 4 to 8
4. Change Picks from 8 to 12
5. Verify all panels reflect changes
6. Test reverse changes

**Expected Results**:

- All changes are reflected in panels
- State remains consistent
- No performance issues
- UI updates smoothly

### Scenario 10: Boundary Testing

**Description**: Test edge cases and boundary values
**Steps**:

1. Test minimum values: Holes=3, Tablets=2, Picks=1
2. Test maximum values: Holes=8, Tablets=30, Picks=99
3. Test rapid changes between min/max
4. Test invalid value handling

**Expected Results**:

- Minimum values work correctly
- Maximum values work correctly
- Rapid changes don't cause issues
- Invalid values are rejected appropriately

## Performance Test Scenarios

### Scenario 11: Performance Under Load

**Description**: Test application performance with rapid changes
**Steps**:

1. Perform 100 rapid input changes
2. Monitor rendering performance
3. Check for memory leaks
4. Verify responsiveness

**Expected Results**:

- Application remains responsive
- No memory leaks
- Rendering performance is acceptable
- No crashes or freezing

### Scenario 12: Large Dataset Handling

**Description**: Test with maximum allowed values
**Steps**:

1. Set Holes to 8
2. Set Tablets to 30
3. Set Picks to 99
4. Test interactions with large dataset
5. Monitor performance

**Expected Results**:

- Application handles large datasets
- Performance remains acceptable
- All interactions work correctly
- No memory issues

## Error Handling Scenarios

### Scenario 13: Error Recovery

**Description**: Test error handling and recovery
**Steps**:

1. Simulate network errors
2. Test invalid data handling
3. Test component unmounting during updates
4. Test context provider errors

**Expected Results**:

- Errors are handled gracefully
- Application recovers from errors
- User experience remains smooth
- Error messages are appropriate

### Scenario 14: Concurrent Updates

**Description**: Test handling of concurrent state updates
**Steps**:

1. Trigger multiple state updates simultaneously
2. Test race conditions
3. Verify state consistency
4. Test cleanup on unmount

**Expected Results**:

- Concurrent updates are handled correctly
- No race conditions
- State remains consistent
- Cleanup works properly

## 15. Color Palette Integration

### Scenario 15.1: Default Color Selection and Application

**Description**: Test default color selection and application to TabletsPanel

**Steps**:

1. Open Control Panel
2. Verify ColorsPanel is visible with default palette
3. Confirm first color is selected by default
4. Click on TabletsPanel in 3 different positions (different tablets/holes)
5. Verify colors are applied to TabletsPanel
6. Check if ThreadsPanel reflects the color changes

**Expected Results**:

- ColorsPanel shows 8 default colors
- First color (#FF0000) is selected by default
- Clicking TabletsPanel positions applies the selected color
- ThreadsPanel shows updated colors based on tablet configuration
- Color input field shows the selected color value

### Scenario 15.2: Color Selection and Application

**Description**: Test selecting different colors and applying them

**Steps**:

1. Open Control Panel
2. Click on second color in palette (#00FF00)
3. Verify color input field updates to show selected color
4. Apply color to 3 different positions in TabletsPanel
5. Verify colors are applied correctly
6. Check ThreadsPanel for color reflection

**Expected Results**:

- Second color becomes selected (border changes to dashed)
- Color input field shows #00FF00
- TabletsPanel positions show the new color
- ThreadsPanel reflects the color changes
- All 3 positions show the same selected color

### Scenario 15.3: Color Modification and Usage

**Description**: Test modifying colors in palette and using them

**Steps**:

1. Open Control Panel
2. Select first color in palette
3. Change color value in input field to #FF00FF
4. Click "Change color" button
5. Verify palette button updates with new color
6. Apply the modified color to TabletsPanel positions
7. Check ThreadsPanel for updated colors

**Expected Results**:

- Color input field accepts new value
- Palette button background changes to new color
- Button title updates to new color value
- TabletsPanel shows the modified color when applied
- ThreadsPanel reflects the updated color scheme

### Scenario 15.4: Multiple Color Usage

**Description**: Test using multiple colors in different positions

**Steps**:

1. Open Control Panel
2. Select first color, apply to tablet position 1
3. Select second color, apply to tablet position 2
4. Select third color, apply to tablet position 3
5. Verify all colors are applied correctly
6. Check ThreadsPanel shows mixed color pattern

**Expected Results**:

- Each tablet position shows different color
- Colors are applied independently
- ThreadsPanel generates pattern with multiple colors
- Color selection works for each application

### Scenario 15.5: Color Palette Persistence

**Description**: Test color palette persistence across panel operations

**Steps**:

1. Open Control Panel
2. Modify several colors in palette
3. Apply colors to various TabletsPanel positions
4. Close and reopen Control Panel
5. Verify modified colors are still present
6. Verify applied colors are still visible

**Expected Results**:

- Modified colors persist after panel close/reopen
- Applied colors remain in TabletsPanel
- ThreadsPanel maintains color pattern
- Color selection state is preserved

### Scenario 15.6: Change Color Button Functionality

**Description**: Test the "Change color" button functionality and visual feedback

**Steps**:

1. Open Control Panel
2. Select first color in palette (should be selected by default)
3. Verify the color input field shows the selected color
4. Clear the input field and type a new color value (e.g., #FF00FF)
5. Click the "Change color" button
6. Verify the palette button background changes to the new color
7. Verify the palette button title updates to the new color value
8. Verify the color input field still shows the new color
9. Apply the changed color to TabletsPanel positions
10. Verify the new color is applied correctly

**Expected Results**:

- Color input field accepts new values
- "Change color" button is clickable and responsive
- Palette button background color changes immediately after clicking "Change color"
- Palette button title attribute updates to new color value
- Color input field maintains the new value
- New color can be applied to TabletsPanel positions
- ThreadsPanel reflects the color change
- No visual glitches or delays in color updates

**Common Issues to Test**:

- Button not responding to clicks
- Color not updating in palette button
- Background color not changing
- Title attribute not updating
- Color not being applied to tablets
- Synchronization issues between panels
