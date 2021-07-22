import { getRepository } from 'typeorm';
import { 
    isAfter,
    isBefore,
    addSeconds,
    subSeconds,
    nextSunday,
    nextMonday,
    nextTuesday,
    nextWednesday,
    nextThursday,
    nextFriday,
    nextSaturday,
    format,
} from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR'
import Task from '../entities/Task';
import AppError from '../../../utils/errors/AppErrors';

interface IVerifyToTaskAlreadyExists {
    executing_user: string;
    start_task: Date;
    end_task: Date;
    repeat: boolean;
    days_of_the_week: string;
}

const getHours = (date: Date): string => {
    return date.getHours()
        +':'+ date.getMinutes()
        +':'+ date.getSeconds();
}

const getDate = (date: string): string => {
    const formatDate = new Date(date);
    return format(formatDate, 'yyyy-MM-dd', {
        locale: ptBR
    });
}

const concatNewDateTime = (date: string, hours: string): Date => {
    const concat = date + ' ' + hours;
    console.log(concat);
    return new Date(concat);
}

class VerifyToTaskAlreadyExists {

    public static async execute({ 
        executing_user, 
        start_task, 
        end_task, 
        repeat,
        days_of_the_week }: IVerifyToTaskAlreadyExists): Promise<void> {
        
        console.log('inicio');

        const startTasK = addSeconds(new Date(start_task), 1);
        const endTask = subSeconds(new Date(end_task), 1);

        const taskRepository = getRepository(Task);

        const taskToUser = await taskRepository.find({
            where: {
                executing_user,
                finished: false
            }
        });

        if(taskToUser.length === 0) {
            console.log('fim');
            return;
        }

        taskToUser.filter(task => {

            const taskStartDate = new Date(task.start_date);
            const taskEndDate = new Date(task.end_date);            

            if(
                (isAfter(startTasK, taskStartDate) && isBefore(startTasK, taskEndDate))
                ||
                (isAfter(endTask, taskStartDate) && isBefore(endTask, taskEndDate))
            ) {
                throw new AppError(
                    'Conflito de tarefas, já existe uma tarefa nesse horário',
                    400
                );
            }
        });
       

        if(repeat) {

            const checkedRepeatTaskToUserExists = taskToUser.filter(task => task.repeat === true);

            if (checkedRepeatTaskToUserExists.length > 0) {

                const days = days_of_the_week.split(',');

                checkedRepeatTaskToUserExists.map(task => {

                    const repeatsTask = task.days_of_the_week.split(','); 

                    days.map(day => {

                        repeatsTask.map(taskDay => {                            

                            if((taskDay === day) && day === 'sunday') { 
                                const sunday = format(nextSunday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(sunday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(sunday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(sunday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(sunday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(sunday), getHours(endTask)), 
                                            concatNewDateTime(getDate(sunday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(sunday), getHours(endTask)), 
                                            concatNewDateTime(getDate(sunday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para domingo agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'monday') { 
                                const monday = format(nextMonday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(monday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(monday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(monday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(monday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(monday), getHours(endTask)), 
                                            concatNewDateTime(getDate(monday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(monday), getHours(endTask)), 
                                            concatNewDateTime(getDate(monday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para segunda-feira agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'tuesday') { 
                                const tuesday = format(nextTuesday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(tuesday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(tuesday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(tuesday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(tuesday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(tuesday), getHours(endTask)), 
                                            concatNewDateTime(getDate(tuesday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(tuesday), getHours(endTask)), 
                                            concatNewDateTime(getDate(tuesday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para terça-feira agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'wednesday') { 
                                const wednesday = format(nextWednesday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(wednesday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(wednesday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(wednesday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(wednesday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(wednesday), getHours(endTask)), 
                                            concatNewDateTime(getDate(wednesday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(wednesday), getHours(endTask)), 
                                            concatNewDateTime(getDate(wednesday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para quarta-feira agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'thursday') { 
                                const thursday = format(nextThursday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(thursday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(thursday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(thursday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(thursday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(thursday), getHours(endTask)), 
                                            concatNewDateTime(getDate(thursday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(thursday), getHours(endTask)), 
                                            concatNewDateTime(getDate(thursday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para quinta-feira agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'friday') { 
                                const friday = format(nextFriday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(friday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(friday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(friday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(friday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(friday), getHours(endTask)), 
                                            concatNewDateTime(getDate(friday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(friday), getHours(endTask)), 
                                            concatNewDateTime(getDate(friday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para sexta-feira agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            if((taskDay === day) && day === 'saturday') { 
                                const saturday = format(nextSaturday(new Date(start_task)), 'yyyy-MM-dd', {
                                    locale: ptBR
                                }); 

                                if(
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(saturday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(saturday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(saturday), getHours(startTasK)), 
                                            concatNewDateTime(getDate(saturday), getHours(task.end_date))
                                        )
                                    )
                                    ||                                    
                                    (  
                                        isAfter(
                                            concatNewDateTime(getDate(saturday), getHours(endTask)), 
                                            concatNewDateTime(getDate(saturday), getHours(task.start_date))
                                        ) 
                                        && 
                                        isBefore(
                                            concatNewDateTime(getDate(saturday), getHours(endTask)), 
                                            concatNewDateTime(getDate(saturday), getHours(task.end_date))
                                        )
                                    )
                                ) {
                                    console.log('3');
                                    throw new AppError(
                                        'Conflito de tarefas, já existe uma tarefa para sábado agendada nesse horário',
                                        400
                                    );
                                }
                            }

                            
                        });
                    });
                });
            }
        }
        console.log('fim');
        return;
    }
}

export default VerifyToTaskAlreadyExists;