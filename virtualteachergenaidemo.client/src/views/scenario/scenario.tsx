import { useState } from 'react';
import { ScenarioItem, Agent } from '../../models/ScenarioItem';
import ScenarioDialog from '../../components/scenario/scenarioDialog';
import ScenarioList from '../../components/scenario/scenarioList';
import { mergeStyles } from '@fluentui/react';
import { Button } from '@fluentui/react-button';
import { useNavigate } from 'react-router-dom';
import { ArrowCircleLeft48Filled } from '@fluentui/react-icons';

interface ScenarioProps {
    title: string;
    isForSimulation: boolean;
}

const Scenario = ({ title }: ScenarioProps) => {
    const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const addScenario = (newScenario: { name: string, description: string, agents: Agent[] }) => {
        setScenarios([...scenarios, { id: "", ...newScenario }]);
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleScenarioStart = (scenario: ScenarioItem) => {        
        navigate('/training', { state: { scenario } });
    };

    const containerClass = mergeStyles({
        marginLeft: '100px',
        marginRight: '50px',
        width: '90%',
    });

    return (
        <div className={containerClass}>
            <div className="header">
                <section className="intro">
                    <div className="back">
                        <Button size="large" appearance="transparent" onClick={handleBackClick} icon={<ArrowCircleLeft48Filled />} />
                    </div>
                    <h1 className='title'>{title}</h1>
                    <p className="intro">
                        A scenario allows the user to choose a scenario to start a simulation. It includes the agents used in the simulation.
                        Your personal dashboard will display all information about a simulation. You can review the discussion, the summary, advice, and feedback.
                    </p>
                </section>
            </div>

            <ScenarioList onScenarioStart={handleScenarioStart} />
            <ScenarioDialog
                isOpen={isDialogOpen}
                onAddScenario={addScenario}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
}

export default Scenario;
