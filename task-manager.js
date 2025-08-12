// Task Manager JavaScript

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.taskIdCounter = this.getNextTaskId();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.updateStatistics();
    }

    bindEvents() {
        // Form submission
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        }

        // Filter events
        const filterPriority = document.getElementById('filter-priority');
        const filterStatus = document.getElementById('filter-status');
        
        if (filterPriority) {
            filterPriority.addEventListener('change', () => this.filterTasks());
        }
        
        if (filterStatus) {
            filterStatus.addEventListener('change', () => this.filterTasks());
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const priorityInput = document.getElementById('task-priority');
        
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const priority = priorityInput.value;
        
        if (!title) {
            this.showNotification('يرجى إدخال عنوان المهمة', 'error');
            return;
        }
        
        const task = {
            id: this.taskIdCounter++,
            title,
            description,
            priority,
            status: 'pending',
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStatistics();
        
        // Reset form
        titleInput.value = '';
        descriptionInput.value = '';
        priorityInput.value = 'medium';
        
        this.showNotification('تم إضافة المهمة بنجاح', 'success');
        
        // Animate new task
        setTimeout(() => {
            const newTaskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (newTaskElement) {
                newTaskElement.classList.add('scale-in');
            }
        }, 100);
    }

    renderTasks() {
        const container = document.getElementById('tasks-container');
        const emptyState = document.getElementById('empty-state');
        
        if (!container) return;
        
        // Clear existing tasks (except sample tasks for demo)
        const dynamicTasks = container.querySelectorAll('.task-item[data-task-id]');
        dynamicTasks.forEach(task => task.remove());
        
        if (this.tasks.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }
        
        if (emptyState) emptyState.classList.add('hidden');
        
        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            container.appendChild(taskElement);
        });
        
        this.filterTasks();
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-secondary transition-colors priority-${task.priority}`;
        taskDiv.setAttribute('data-task-id', task.id);
        taskDiv.setAttribute('data-priority', task.priority);
        taskDiv.setAttribute('data-status', task.status);
        
        if (task.status === 'completed') {
            taskDiv.classList.add('status-completed');
        }
        
        const priorityColors = {
            high: 'danger',
            medium: 'warning',
            low: 'success'
        };
        
        const priorityLabels = {
            high: 'عالية',
            medium: 'متوسطة',
            low: 'منخفضة'
        };
        
        const statusLabels = {
            pending: 'معلقة',
            completed: 'مكتملة'
        };
        
        const statusColors = {
            pending: 'warning',
            completed: 'success'
        };
        
        taskDiv.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3 rtl:space-x-reverse flex-1">
                    <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} 
                           class="mt-1 w-4 h-4 text-secondary bg-gray-700 border-gray-600 rounded focus:ring-secondary task-checkbox" 
                           data-task-id="${task.id}">
                    <div class="flex-1">
                        <h4 class="font-semibold mb-1 task-title ${task.status === 'completed' ? 'line-through text-gray-500' : ''}">${task.title}</h4>
                        ${task.description ? `<p class="text-gray-400 text-sm mb-2">${task.description}</p>` : ''}
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="px-2 py-1 bg-${priorityColors[task.priority]}/20 text-${priorityColors[task.priority]} text-xs rounded-full">
                                ${priorityLabels[task.priority]}
                            </span>
                            <span class="px-2 py-1 bg-${statusColors[task.status]}/20 text-${statusColors[task.status]} text-xs rounded-full">
                                ${statusLabels[task.status]}
                            </span>
                            <span class="text-xs text-gray-500">
                                ${this.formatDate(task.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <button class="text-gray-400 hover:text-secondary transition-colors edit-task-btn" 
                            data-task-id="${task.id}" title="تعديل">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button class="text-gray-400 hover:text-danger transition-colors delete-task-btn" 
                            data-task-id="${task.id}" title="حذف">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Bind events for this task
        const checkbox = taskDiv.querySelector('.task-checkbox');
        const deleteBtn = taskDiv.querySelector('.delete-task-btn');
        const editBtn = taskDiv.querySelector('.edit-task-btn');
        
        checkbox.addEventListener('change', () => this.toggleTaskStatus(task.id));
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        editBtn.addEventListener('click', () => this.editTask(task.id));
        
        return taskDiv;
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        task.completedAt = task.status === 'completed' ? new Date().toISOString() : null;
        
        this.saveTasks();
        this.renderTasks();
        this.updateStatistics();
        
        const message = task.status === 'completed' ? 'تم إكمال المهمة' : 'تم إلغاء إكمال المهمة';
        this.showNotification(message, 'success');
    }

    deleteTask(taskId) {
        if (!confirm('هل أنت متأكد من حذف هذه المهمة؟')) return;
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.style.transform = 'translateX(-100%)';
            taskElement.style.opacity = '0';
            
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this.saveTasks();
                this.renderTasks();
                this.updateStatistics();
                this.showNotification('تم حذف المهمة', 'success');
            }, 300);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const newTitle = prompt('عنوان المهمة الجديد:', task.title);
        if (newTitle === null) return;
        
        if (!newTitle.trim()) {
            this.showNotification('يرجى إدخال عنوان صحيح', 'error');
            return;
        }
        
        const newDescription = prompt('وصف المهمة الجديد:', task.description || '');
        if (newDescription === null) return;
        
        task.title = newTitle.trim();
        task.description = newDescription.trim();
        
        this.saveTasks();
        this.renderTasks();
        this.showNotification('تم تحديث المهمة', 'success');
    }

    filterTasks() {
        const priorityFilter = document.getElementById('filter-priority')?.value || 'all';
        const statusFilter = document.getElementById('filter-status')?.value || 'all';
        
        const taskElements = document.querySelectorAll('.task-item');
        
        taskElements.forEach(element => {
            const taskPriority = element.getAttribute('data-priority');
            const taskStatus = element.getAttribute('data-status');
            
            const priorityMatch = priorityFilter === 'all' || taskPriority === priorityFilter;
            const statusMatch = statusFilter === 'all' || taskStatus === statusFilter;
            
            if (priorityMatch && statusMatch) {
                element.style.display = 'block';
                element.classList.add('fade-in');
            } else {
                element.style.display = 'none';
                element.classList.remove('fade-in');
            }
        });
    }

    updateStatistics() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const pendingTasks = totalTasks - completedTasks;
        
        const totalElement = document.getElementById('total-tasks');
        const completedElement = document.getElementById('completed-tasks');
        const pendingElement = document.getElementById('pending-tasks');
        
        if (totalElement) {
            this.animateNumber(totalElement, parseInt(totalElement.textContent) || 0, totalTasks);
        }
        
        if (completedElement) {
            this.animateNumber(completedElement, parseInt(completedElement.textContent) || 0, completedTasks);
        }
        
        if (pendingElement) {
            this.animateNumber(pendingElement, parseInt(pendingElement.textContent) || 0, pendingTasks);
        }
    }

    animateNumber(element, from, to) {
        const duration = 500;
        const steps = 20;
        const stepValue = (to - from) / steps;
        const stepDuration = duration / steps;
        
        let current = from;
        const timer = setInterval(() => {
            current += stepValue;
            if ((stepValue > 0 && current >= to) || (stepValue < 0 && current <= to)) {
                current = to;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, stepDuration);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300`;
        
        // Set color based on type
        switch (type) {
            case 'success':
                notification.classList.add('bg-success');
                break;
            case 'error':
                notification.classList.add('bg-danger');
                break;
            case 'warning':
                notification.classList.add('bg-warning');
                break;
            default:
                notification.classList.add('bg-secondary');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'اليوم';
        } else if (diffDays === 2) {
            return 'أمس';
        } else if (diffDays <= 7) {
            return `منذ ${diffDays} أيام`;
        } else {
            return date.toLocaleDateString('ar-SA');
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    // Local Storage methods
    saveTasks() {
        localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('taskflow_counter', this.taskIdCounter.toString());
    }

    loadTasks() {
        const saved = localStorage.getItem('taskflow_tasks');
        const tasks = saved ? JSON.parse(saved) : [];
        if (tasks.length === 0) {
            // Add some default tasks if no tasks are found
            return [
                {
                    id: 1,
                    title: 'تصميم الواجهة الرئيسية',
                    description: 'الانتهاء من تصميم الواجهة الرئيسية للموقع وتضمين جميع العناصر الأساسية.',
                    priority: 'high',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    completedAt: null
                },
                {
                    id: 2,
                    title: 'تطوير النظام الخلفي',
                    description: 'بناء واجهات برمجة التطبيقات (APIs) اللازمة لإدارة المهام وتخزين البيانات.',
                    priority: 'medium',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    completedAt: null
                },
                {
                    id: 3,
                    title: 'اختبار التطبيق',
                    description: 'إجراء اختبارات شاملة لجميع وظائف التطبيق والتأكد من خلوه من الأخطاء.',
                    priority: 'low',
                    status: 'completed',
                    createdAt: new Date().toISOString(),
                    completedAt: new Date().toISOString()
                }
            ];
        }
        return tasks;
    }

    getNextTaskId() {
        const saved = localStorage.getItem('taskflow_counter');
        return saved ? parseInt(saved) : 1;
    }

    // Export/Import functionality
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('تم تصدير المهام بنجاح', 'success');
    }

    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = importedTasks;
                    this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStatistics();
                    this.showNotification('تم استيراد المهام بنجاح', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showNotification('خطأ في استيراد الملف', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Search functionality
    searchTasks(query) {
        const taskElements = document.querySelectorAll('.task-item');
        const searchQuery = query.toLowerCase().trim();
        
        taskElements.forEach(element => {
            const title = element.querySelector('.task-title').textContent.toLowerCase();
            const description = element.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Keyboard shortcuts
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: New task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                document.getElementById('task-title')?.focus();
            }
            
            // Ctrl/Cmd + E: Export tasks
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportTasks();
            }
            
            // Escape: Clear filters
            if (e.key === 'Escape') {
                const priorityFilter = document.getElementById('filter-priority');
                const statusFilter = document.getElementById('filter-status');
                
                if (priorityFilter) priorityFilter.value = 'all';
                if (statusFilter) statusFilter.value = 'all';
                
                this.filterTasks();
            }
        });
    }
}

// Initialize Task Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
    window.taskManager.initKeyboardShortcuts();
});

