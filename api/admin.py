from django.contrib import admin

from .models import Element, ElementCountInIon, ElementCountInCovalentSubstance, Ion, Klass, CovalentSubstance, IonicSubstance, Reaction

@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    ordering = ('atomic_number',)
    list_filter = ('type', 'family', 'block', 'period', 'group')

class ElementCountInIonInline(admin.TabularInline):
    model = ElementCountInIon
    extra = 2

class ElementCountInCovalentSubstanceInline(admin.TabularInline):
    model = ElementCountInCovalentSubstance
    extra = 2

@admin.register(Ion)
class IonAdmin(admin.ModelAdmin):
    inlines = (ElementCountInIonInline,)
    exclude = ('positive',)
    list_filter = ('main_element_count__element', 'main_element_count__oxidation')

@admin.register(Klass)
class KlassAdmin(admin.ModelAdmin):
    ordering = ('is_organic', 'name')
    list_filter = ('is_organic',)

@admin.register(CovalentSubstance)
class CovalentSubstanceAdmin(admin.ModelAdmin):
    inlines = (ElementCountInCovalentSubstanceInline,)

admin.site.register((ElementCountInIon, ElementCountInCovalentSubstance, IonicSubstance, Reaction))