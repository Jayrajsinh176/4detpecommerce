<?php

namespace App\Filament\Resources\Orderecoms;

use App\Filament\Resources\Orderecoms\Pages\CreateOrderecom;
use App\Filament\Resources\Orderecoms\Pages\EditOrderecom;
use App\Filament\Resources\Orderecoms\Pages\ListOrderecoms;
use App\Filament\Resources\Orderecoms\Schemas\OrderecomForm;
use App\Filament\Resources\Orderecoms\Tables\OrderecomsTable;
use App\Models\Orderecom;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OrderecomResource extends Resource
{
    protected static ?string $model = Orderecom::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationLabel = 'Orders';
protected static ?string $modelLabel = 'Order';
protected static ?string $pluralModelLabel = 'Orders';  
    public static function form(Schema $schema): Schema
    {
        return OrderecomForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OrderecomsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOrderecoms::route('/'),
            'create' => CreateOrderecom::route('/create'),
            'edit' => EditOrderecom::route('/{record}/edit'),
        ];
    }
}
